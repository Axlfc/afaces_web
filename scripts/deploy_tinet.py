#!/usr/bin/env python3
"""Publicación incremental segura mediante FTPS explícito para TINET."""
import argparse
import hashlib
import io
import json
import re
import os
import ssl
import sys
from ftplib import FTP_TLS, error_perm
from pathlib import Path



# Intermedio emitido por Sectigo, necesario porque TINET omite la cadena en FTPS.
# Huella DER del intermedio público contrastada con la documentación de Sectigo.
# Se descarga a RUNNER_TEMP durante Actions; NUNCA se versiona el PEM.
SECTIGO_OV_R36_SHA256 = "6542d176bed50f193c0ce297ae44ecd8a0a86bec2ede682769344059b4e78530"


def make_ftps_context(ca_path=None):
    """Usa raíces del sistema más el intermedio OV R36 validado por SHA-256.

    No desactiva la verificación de cadena ni la comprobación de hostname.
    El intermedio NO sustituye a las CAs raíz confiables del sistema.
    """
    ca_path = ca_path or os.getenv("TINET_INTERMEDIATE_PEM")
    if not ca_path:
        raise ValueError(
            "Falta TINET_INTERMEDIATE_PEM: descarga el intermedio en un "
            "directorio temporal mediante python -m scripts.fetch_tinet_intermediate"
        )
    pem = Path(ca_path).read_text(encoding="ascii")
    if (pem.count("-----BEGIN CERTIFICATE-----") != 1
            or pem.count("-----END CERTIFICATE-----") != 1
            or "PRIVATE KEY" in pem):
        raise ValueError("El archivo temporal debe contener un único certificado público PEM")
    try:
        der = ssl.PEM_cert_to_DER_cert(pem)
    except (ValueError, ssl.SSLError) as exc:
        raise ValueError("Certificado intermedio Sectigo PEM inválido") from exc
    if hashlib.sha256(der).hexdigest() != SECTIGO_OV_R36_SHA256:
        raise ValueError("Huella SHA-256 del certificado intermedio Sectigo inesperada")
    context = ssl.create_default_context(purpose=ssl.Purpose.SERVER_AUTH)
    context.load_verify_locations(cadata=ssl.DER_cert_to_PEM_cert(der))
    return context


def plan(files, old_files):
    changed = [p for p in files if old_files.get(p) != files[p]]
    # Recursos antes de HTML; welcome e index últimos.
    return sorted(changed, key=lambda p: (p.endswith(".html"), p in ("index.html", "welcome.html"), p))


def cd_path(ftp, root, parts, create=False):
    ftp.cwd(root)
    for part in parts:
        if part in ("", ".", "..") or "/" in part:
            raise ValueError("Segmento FTP inseguro")
        try:
            ftp.cwd(part)
        except error_perm:
            if not create:
                raise
            ftp.mkd(part)
            ftp.cwd(part)


def retrieve(ftp, filename):
    out = io.BytesIO()
    try:
        ftp.retrbinary("RETR " + filename, out.write)
    except error_perm as exc:
        if str(exc).startswith("550"):
            return None
        raise
    return out.getvalue()



def discover_webroot(ftp, remote):
    """Localiza de forma inequívoca la web preexistente; jamás crea otra raíz.

    'auto' admite el directorio inicial y su hijo html/ únicamente.
    Con '.' se valida solo el directorio inicial, para clientes ya ubicados.
    """
    if remote not in ("auto", ".", "./"):
        raise ValueError("TINET_REMOTE_DIR solo admite 'auto' o '.'")
    start = ftp.pwd()
    candidates = []
    for relative in ((".", "html") if remote == "auto" else (".",)):
        ftp.cwd(start)
        try:
            ftp.cwd(relative)
            names = {n.rsplit("/", 1)[-1] for n in ftp.nlst()}
        except error_perm:
            continue
        if "welcome.html" in names:
            candidates.append(ftp.pwd())
    ftp.cwd(start)
    # Nunca dar prioridad arbitraria a una ubicación cuando hay dos webs.
    if len(set(candidates)) != 1:
        raise ValueError(
            "Directorio web FTP no identificado de forma inequívoca: "
            "se requiere un único welcome.html en la raíz de sesión o en html/"
        )
    ftp.cwd(candidates[0])
    return ftp.pwd()


def publish(ftp, dist, remote, backup, force=False):
    root = discover_webroot(ftp, remote)
    manifest_file = dist / "deploy-manifest.json"
    manifest = json.loads(manifest_file.read_text(encoding="utf-8"))
    if manifest.get("schema_version") != 1:
        raise ValueError("Manifiesto de despliegue incompatible")
    files = manifest["files"]
    if not isinstance(files, dict) or "welcome.html" not in files:
        raise ValueError("Manifiesto incompleto: falta welcome.html")
    for name, digest in files.items():
        if (not isinstance(name, str) or not isinstance(digest, str)
                or not re.fullmatch(r"[a-f0-9]{64}", digest)
                or name.startswith("/") or ".." in Path(name).parts):
            raise ValueError("Ruta o hash inválido: " + str(name))
        local_file = dist / name
        if local_file.is_symlink() or not local_file.is_file():
            raise ValueError("Archivo local inseguro o inexistente: " + name)
        if hashlib.sha256(local_file.read_bytes()).hexdigest() != digest:
            raise ValueError("Hash local incoherente con manifiesto: " + name)
    previous = retrieve(ftp, "deploy-manifest.json")
    try:
        old_files = json.loads(previous)["files"] if previous else {}
    except (ValueError, KeyError, TypeError):
        old_files = {}
    # El manifiesto previo no prueba el contenido actual: cotejar hashes por FTPS.
    # Esto recupera tanto ficheros eliminados como alteraciones manuales/remotas.
    if not force:
        for name, digest in files.items():
            if old_files.get(name) != digest:
                continue
            parts = Path(name).parts
            try:
                cd_path(ftp, root, parts[:-1])
                observed = retrieve(ftp, parts[-1])
            except error_perm:
                observed = None
            if observed is None or hashlib.sha256(observed).hexdigest() != digest:
                old_files.pop(name, None)
    changed = plan(files, {} if force else old_files)
    print(f"Destino FTP confirmado: {root}. Archivos a actualizar: {len(changed)} / {len(files)}.")
    backup.mkdir(parents=True, exist_ok=True)
    if previous is not None:
        (backup / "deploy-manifest.json").write_bytes(previous)
    for index, name in enumerate(changed, 1):
        parts = Path(name).parts
        cd_path(ftp, root, parts[:-1], create=True)
        basename = parts[-1]
        old = retrieve(ftp, basename)
        if old is not None:
            local = backup / name
            local.parent.mkdir(parents=True, exist_ok=True)
            local.write_bytes(old)
        # STOR del contenido; no borra otros ficheros o directorios del usuario.
        with (dist / name).open("rb") as stream:
            ftp.storbinary("STOR " + basename, stream)
        print(f"[{index}/{len(changed)}] {name}")
    cd_path(ftp, root, (), create=False)
    # El manifiesto se publica al final: solo representa una publicación completa.
    with manifest_file.open("rb") as stream:
        ftp.storbinary("STOR deploy-manifest.json", stream)
    print("OK: publicación FTPS terminada. Pendiente de verificación HTTP.")
    return len(changed)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dist", default="dist")
    parser.add_argument("--backup", default=".tinet-backup")
    parser.add_argument("--remote-dir", default=os.getenv("TINET_REMOTE_DIR", "auto"))
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force", action="store_true", help="Reenviar todos los archivos incluso si los hashes coinciden")
    args = parser.parse_args()
    dist = Path(args.dist).resolve()
    try:
        manifest = json.loads((dist / "deploy-manifest.json").read_text(encoding="utf-8"))
        if args.dry_run:
            print(f"Plan local: {len(manifest['files'])} archivos, sin conectarse al FTP")
            return 0
        host = os.getenv("FTP_SERVER", "usuaris.tinet.cat")
        if host != "usuaris.tinet.cat":
            raise ValueError("FTP_SERVER no coincide con el servidor oficial de TINET")
        user = os.getenv("FTP_USERNAME", "")
        password = os.getenv("FTP_PASSWORD", "")
        if not user or not password:
            raise ValueError("Faltan los secretos FTP_USERNAME o FTP_PASSWORD")
        port = int(os.getenv("TINET_FTP_PORT", "21"))
        with FTP_TLS(context=make_ftps_context(), timeout=30) as ftp:
            ftp.connect(host, port)
            ftp.login(user, password)
            ftp.prot_p()  # FTPS explícito con canal de datos protegido.
            publish(ftp, dist, args.remote_dir, Path(args.backup).resolve(), force=args.force)
        return 0
    except (OSError, ValueError, KeyError, error_perm, ssl.SSLError, json.JSONDecodeError) as exc:
        print("ERROR FTPS:", exc, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())

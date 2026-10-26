#!/usr/bin/env python3
"""Publicación incremental segura mediante FTPS explícito para TINET."""
import argparse
import io
import json
import os
import ssl
import sys
from ftplib import FTP_TLS, error_perm
from pathlib import Path


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


def publish(ftp, dist, remote, backup):
    if remote not in ("html", "./html", "/html", ".", "./"):
        raise ValueError("TINET_REMOTE_DIR debe ser html o . si la cuenta ya abre dentro de html")
    ftp.cwd(remote)
    root = ftp.pwd()
    names = {name.rsplit("/", 1)[-1] for name in ftp.nlst()}
    if "welcome.html" not in names:
        raise ValueError("El directorio FTP no contiene welcome.html: se cancela para evitar publicar fuera de la web")
    manifest_file = dist / "deploy-manifest.json"
    manifest = json.loads(manifest_file.read_text(encoding="utf-8"))
    if manifest.get("schema_version") != 1:
        raise ValueError("Manifiesto de despliegue incompatible")
    files = manifest["files"]
    for name in files:
        if name.startswith("/") or ".." in Path(name).parts or not (dist / name).is_file():
            raise ValueError("Ruta de despliegue insegura: " + name)
    previous = retrieve(ftp, "deploy-manifest.json")
    try:
        old_files = json.loads(previous)["files"] if previous else {}
    except (ValueError, KeyError, TypeError):
        old_files = {}
    changed = plan(files, old_files)
    print(f"Destino verificado: {root}. Actualizados: {len(changed)} / {len(files)}.")
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
    parser.add_argument("--remote-dir", default=os.getenv("TINET_REMOTE_DIR", "html"))
    parser.add_argument("--dry-run", action="store_true")
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
        with FTP_TLS(context=ssl.create_default_context(), timeout=30) as ftp:
            ftp.connect(host, port)
            ftp.login(user, password)
            ftp.prot_p()  # FTPS explícito con canal de datos protegido.
            publish(ftp, dist, args.remote_dir, Path(args.backup).resolve())
        return 0
    except (OSError, ValueError, KeyError, error_perm, ssl.SSLError, json.JSONDecodeError) as exc:
        print("ERROR FTPS:", exc, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())

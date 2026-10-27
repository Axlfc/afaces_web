#!/usr/bin/env python3
"""Construye y verifica el paquete estático público para TINET. Solo stdlib."""
import argparse
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import parse_qsl, unquote, urlencode, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
REQUIRED = (
    "welcome.html", "mapa.html", "timeline.html", "perfiles.html",
    "lanzamiento.html", "recomendaciones.html", "onboarding.html",
    "feedback.html", "letras.html", "accesibilidad.html", "prensa.html",
)
SUFFIXES = {
    "assets": {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".avif", ".woff", ".woff2", ".ttf"},
    "css": {".css"},
    "js": {".js"},
    "data": {".json"},
}
ATTR = re.compile(r"""(?:src|href)\s*=\s*["']([^"']+)["']""", re.I)
VIDEO = re.compile(r"https://www\.youtube\.com/watch\?v=[A-Za-z0-9_-]{11}")


def validate_catalog():
    doc = json.loads((ROOT / "data/metadata.json").read_text(encoding="utf-8"))
    videos = doc["videos"]
    if len(videos) != doc["count"]:
        raise ValueError("Catálogo: contador incoherente")
    refs = [v["ref"] for v in videos]
    if len(refs) != len(set(refs)):
        raise ValueError("Catálogo: referencias duplicadas")
    phases = {p["id"] for p in doc["architecture"]["phases"]}
    urls = set()
    for v in videos:
        ref = v["ref"]
        prefix = "A" if v["coleccion"] == "album" else "L" if v["coleccion"] == "lp" else None
        if prefix is None or ref != f'{prefix}:{v["numero"]}' or not v.get("title"):
            raise ValueError("Catálogo: referencia o título inválido: " + ref)
        if not isinstance(v.get("tags"), list) or not v["tags"] or v.get("fase_id") not in phases:
            raise ValueError("Catálogo: faltan etiquetas o fase: " + ref)
        url = v.get("youtube_url", "")
        if not VIDEO.fullmatch(url) or url in urls:
            raise ValueError("Catálogo: vídeo inválido o duplicado: " + ref)
        urls.add(url)
        last = -1
        for track in v.get("tracklist", []):
            if not isinstance(track.get("start_time"), int) or track["start_time"] <= last or not track.get("title"):
                raise ValueError("Catálogo: capítulos incorrectos: " + ref)
            last = track["start_time"]
    for prefix in ("A", "L"):
        numbers = sorted(v["numero"] for v in videos if v["ref"].startswith(prefix + ":"))
        if numbers != list(range(1, len(numbers) + 1)):
            raise ValueError("Catálogo: numeración no consecutiva: " + prefix)
    return len(videos)


def copy_public_files():
    DIST.mkdir()
    for folder, suffixes in SUFFIXES.items():
        src = ROOT / folder
        if not src.is_dir():
            raise ValueError("Falta directorio público: " + folder)
        for file in src.rglob("*"):
            if file.is_symlink():
                raise ValueError("Enlace simbólico prohibido: " + str(file))
            if not file.is_file() or file.suffix.lower() not in suffixes:
                continue
            relative = file.relative_to(ROOT)
            if any(part.startswith(".") for part in relative.parts):
                raise ValueError("Archivo oculto público no permitido: " + str(relative))
            dest = DIST / relative
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(file, dest)
    for page in ROOT.glob("*.html"):
        if page.is_symlink():
            raise ValueError("Página simbólica prohibida: " + str(page))
        shutil.copy2(page, DIST / page.name)
    (DIST / "index.html").write_text(
        '<!doctype html><html lang="es"><meta charset="utf-8">'
        '<meta http-equiv="refresh" content="0;url=welcome.html">'
        '<title>AFACES</title><a href="welcome.html">Entrar en AFACES</a></html>\n',
        encoding="utf-8",
    )



# Solo se modifica el HTML generado en dist/, nunca los archivos fuente.
# Así los navegadores obtienen el CSS y JavaScript nuevos tras cada despliegue.
ASSET_ATTR = re.compile(
    r"""(?P<prefix>\b(?:src|href)\s*=\s*)(?P<quote>["'])(?P<url>[^"']+)(?P=quote)""",
    re.I,
)


def version_static_assets():
    base = DIST.resolve()
    for page in DIST.rglob("*.html"):
        source = page.read_text(encoding="utf-8")

        def rewrite(match):
            url = match.group("url")
            parts = urlsplit(url)
            if parts.scheme or parts.netloc or not parts.path or parts.path.startswith("/"):
                return match.group(0)
            if Path(parts.path).suffix.lower() not in {".css", ".js"}:
                return match.group(0)
            asset = (page.parent / unquote(parts.path)).resolve()
            if not asset.is_relative_to(base) or not asset.is_file():
                # validate_links() informará de recursos inexistentes o inseguros.
                return match.group(0)
            digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
            query = [(k, v) for k, v in parse_qsl(parts.query, keep_blank_values=True) if k != "v"]
            query.append(("v", digest))
            versioned = urlunsplit((parts.scheme, parts.netloc, parts.path,
                                     urlencode(query), parts.fragment))
            return match.group("prefix") + match.group("quote") + versioned + match.group("quote")

        updated = ASSET_ATTR.sub(rewrite, source)
        if updated != source:
            page.write_text(updated, encoding="utf-8")


def validate_links():
    for page in REQUIRED:
        if not (DIST / page).is_file():
            raise ValueError("Falta página obligatoria: " + page)
    base = DIST.resolve()
    for page in DIST.rglob("*.html"):
        for url in ATTR.findall(page.read_text(encoding="utf-8")):
            if url.startswith(("#", "//")):
                continue
            parsed = urlsplit(url)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            rel = unquote(parsed.path)
            target = ((DIST if rel.startswith("/") else page.parent) / rel.lstrip("/")).resolve()
            if not target.is_relative_to(base) or not target.is_file():
                raise ValueError(f"Enlace local inexistente: {page.relative_to(DIST)} -> {url}")


def build(manifest=False):
    count = validate_catalog()
    if DIST.exists():
        shutil.rmtree(DIST)
    copy_public_files()
    version_static_assets()
    validate_links()
    files = sorted(p for p in DIST.rglob("*") if p.is_file())
    if not files:
        raise ValueError("Paquete vacío")
    sums = {p.relative_to(DIST).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
    if manifest:
        (DIST / "deploy-manifest.json").write_text(
            json.dumps({"schema_version": 1, "catalog_count": count, "files": sums},
                       ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"OK: {count} lanzamientos y {len(files)} archivos estáticos válidos")
    return sums


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", action="store_true")
    args = parser.parse_args()
    try:
        build(args.manifest)
    except (ValueError, OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        print("ERROR:", exc, file=sys.stderr)
        raise SystemExit(1)

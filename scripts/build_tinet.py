#!/usr/bin/env python3
"""Construye un sitio estático reproducible para TINET. Solo stdlib."""
import argparse
import json
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
DIRS = ("assets", "css", "js", "data")
REQUIRED = ("welcome.html", "mapa.html", "timeline.html", "perfiles.html", "lanzamiento.html")
ATTR = re.compile(r"""(?:src|href)\s*=\s*["']([^"']+)["']""", re.I)


def validate_catalog():
    doc = json.loads((ROOT / "data/metadata.json").read_text(encoding="utf-8"))
    videos = doc["videos"]
    refs = [v["ref"] for v in videos]
    if len(refs) != len(set(refs)) or len(videos) != doc["count"]:
        raise ValueError("Catálogo: referencias duplicadas o contador incoherente")
    for video in videos:
        if not video.get("tags") or not isinstance(video.get("fase_id"), int):
            raise ValueError("Catálogo: etiquetas o fase ausentes: " + video["ref"])
    return len(videos)


def build():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    for folder in DIRS:
        source = ROOT / folder
        if not source.is_dir():
            raise ValueError("Falta directorio publicable: " + folder)
        shutil.copytree(source, DIST / folder, ignore=shutil.ignore_patterns(
            ".git", "__pycache__", "*.pyc", ".DS_Store"))
    for page in ROOT.glob("*.html"):
        shutil.copy2(page, DIST / page.name)
    for page in REQUIRED:
        if not (DIST / page).is_file():
            raise ValueError("Falta página obligatoria: " + page)
    for page in DIST.rglob("*.html"):
        html = page.read_text(encoding="utf-8")
        for url in ATTR.findall(html):
            if url.startswith(("#", "//")):
                continue
            parsed = urlsplit(url)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            target = (page.parent / unquote(parsed.path)).resolve()
            if not target.is_relative_to(DIST.resolve()) or not target.is_file():
                raise ValueError(f"Enlace local inexistente: {page.relative_to(DIST)} -> {url}")
    count = validate_catalog()
    files = sorted(p.relative_to(DIST).as_posix() for p in DIST.rglob("*") if p.is_file())
    if not files:
        raise ValueError("Paquete vacío")
    print(f"OK: {count} lanzamientos, {len(files)} archivos publicables")
    return files


if __name__ == "__main__":
    try:
        parser = argparse.ArgumentParser()
        parser.add_argument("--manifest", action="store_true")
        args = parser.parse_args()
        files = build()
        if args.manifest:
            (DIST / "deploy-manifest.json").write_text(
                json.dumps({"files": files}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        print("ERROR:", exc, file=sys.stderr)
        raise SystemExit(1)

#!/usr/bin/env python3
"""Sincroniza metadata.json desde las listas y grupos de js/main.js. Solo stdlib."""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "js/main.js"
TARGET = ROOT / "data/metadata.json"


def between(text, a, b):
    i = text.index(a)
    return text[i:text.index(b, i + len(a))]


def extract(source, name, end, prefix, collection):
    part = between(source, "const " + name + " = [", end)
    entries = re.findall(r"\{\s*n\s*:\s*(\d+)\s*,\s*title\s*:\s*(['\"])(.*?)\2\s*,\s*vid\s*:\s*(['\"])(.*?)\4\s*,\s*phase\s*:\s*(['\"])(.*?)\6", part, re.S)
    if len(entries) != len(re.findall(r"\{\s*n\s*:", part)):
        raise ValueError("Entrada no reconocida en " + name)
    result = []
    for n, _, title, _, video, _, phase in entries:
        if not re.fullmatch(r"[A-Za-z0-9_-]{11}", video):
            raise ValueError("ID de YouTube inválido: " + prefix + ":" + n)
        result.append(dict(ref=prefix + ":" + n, titulo=title, title=title, coleccion=collection,
                           numero=int(n), fase=phase, youtube_url="https://www.youtube.com/watch?v=" + video))
    return result


def generate():
    source = SOURCE.read_text(encoding="utf-8")
    previous = json.loads(TARGET.read_text(encoding="utf-8"))
    old = {x["ref"]: x for x in previous["videos"]}
    items = extract(source, "ALBUMS", "const LPS = [", "A", "album")
    items += extract(source, "LPS", "const AFACES_SITE =", "L", "lp")
    if len({x["ref"] for x in items}) != len(items):
        raise ValueError("Referencias duplicadas")
    missing = set(old) - {x["ref"] for x in items}
    if missing:
        raise ValueError("No se permite borrar lanzamientos: " + ", ".join(sorted(missing)))
    phases_text = between(source, "  phases: [", "  themes: [")
    phase_re = r"num\s*:\s*'Fase\s+(\d+)'[\s\S]*?name\s*:\s*'([^']+)'[\s\S]*?collection\s*:\s*'([^']+)'[\s\S]*?from\s*:\s*(\d+)[\s\S]*?to\s*:\s*('max'|\d+)"
    phases = []
    for number, name, collection, start, end in re.findall(phase_re, phases_text):
        phases.append(dict(id=int(number), name=name, collection="album" if collection == "albums" else "lp",
                           min=int(start), max=999999 if end == "'max'" else int(end)))
    if not phases:
        raise ValueError("Fases no reconocidas")
    for phase in previous.get("architecture", {}).get("phases", []):
        if phase.get("pending") and phase["id"] not in {x["id"] for x in phases}:
            phases.append(phase)
    phases.sort(key=lambda x: x["id"])
    themes_text = between(source, "  themes: [", "  series: [")
    theme_re = r"key\s*:\s*'([^']+)'[\s\S]*?name\s*:\s*'([^']+)'[\s\S]*?playlistId\s*:\s*'([^']*)'[\s\S]*?refs\s*:\s*\[([^\]]*)\]"
    themes = []
    for key, name, playlist, refs in re.findall(theme_re, themes_text):
        themes.append(dict(id=key, name=name, playlistId=playlist,
                           refs=re.findall(r"'([AL]:\d+)'", refs)))
    if len(themes) != len(re.findall(r"\bkey\s*:", themes_text)):
        raise ValueError("Núcleos no reconocidos")
    updated = []
    for item in items:
        ref = item["ref"]
        row = dict(old.get(ref, {}))
        row.update(item)
        matches = [p for p in phases if not p.get("pending") and p["collection"] == item["coleccion"]
                   and p["min"] <= item["numero"] <= p["max"]]
        if len(matches) > 1:
            raise ValueError("Fases solapadas: " + ref)
        row["fase_id"] = matches[0]["id"] if matches else None
        row["nucleos_architectura"] = [t["id"] for t in themes if ref in t["refs"]]
        row.setdefault("nucleos", [])
        row.setdefault("clasificacion", "pendiente_revision")
        updated.append(row)
    arch = dict(previous.get("architecture", {}))
    arch.update(source="js/main.js", phases=phases,
                nuclei=[{k: v for k, v in t.items() if k != "refs"} for t in themes])
    previous.update(source="js/main.js (ALBUMS, LPS y AFACES_SITE)",
                    count=len(updated), videos=updated, architecture=arch)
    return json.dumps(previous, ensure_ascii=False, indent=2) + "\n"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    try:
        output = generate()
        current = TARGET.read_text(encoding="utf-8")
        if args.check:
            if output != current:
                print("DESACTUALIZADO: ejecuta python scripts/sync_catalog.py")
                return 1
            print("OK: catálogo sincronizado")
        elif output != current:
            TARGET.write_text(output, encoding="utf-8")
            print("Catálogo actualizado. Fechas y datos editoriales conservados.")
        else:
            print("Catálogo sin cambios.")
        return 0
    except (ValueError, OSError, KeyError, json.JSONDecodeError) as exc:
        print("ERROR: " + str(exc), file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())

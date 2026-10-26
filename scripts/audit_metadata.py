#!/usr/bin/env python3
"""Audita el catálogo importado y exporta los huecos para revisión humana."""
import argparse
import csv
import json
from pathlib import Path

NUCLEOS = {"control", "vacio", "conflicto", "identidad", "existencia"}

def audit(path: Path, output: Path) -> int:
    data = json.loads(path.read_text(encoding="utf-8"))
    videos = data["videos"]
    seen = set()
    gaps = []
    for item in videos:
        ref = item.get("ref", "")
        issues = []
        if not ref or ref in seen:
            issues.append("referencia ausente o duplicada")
        seen.add(ref)
        if not item.get("title"):
            issues.append("título ausente")
        if not item.get("youtube_url", "").startswith("https://www.youtube.com/watch?v="):
            issues.append("URL YouTube ausente o mal formada")
        nuclei = item.get("nucleos", [])
        if not nuclei:
            issues.append("núcleo pendiente")
        if not isinstance(nuclei, list) or any(n not in NUCLEOS for n in nuclei):
            issues.append("núcleo no válido")
        if issues:
            gaps.append({"ref": ref, "titulo": item.get("title", ""), "incidencias": "; ".join(issues), "nucleos_propuestos": ""})
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["ref", "titulo", "incidencias", "nucleos_propuestos"])
        writer.writeheader()
        writer.writerows(gaps)
    print(f"Lanzamientos: {len(videos)} | Huecos: {len(gaps)} | Informe: {output}")
    return 0

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Auditar metadatos de AFACES")
    parser.add_argument("--metadata", type=Path, default=Path("data/metadata.json"))
    parser.add_argument("--output", type=Path, default=Path("data/metadata-gaps.csv"))
    args = parser.parse_args()
    raise SystemExit(audit(args.metadata, args.output))

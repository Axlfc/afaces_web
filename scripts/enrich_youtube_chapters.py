#!/usr/bin/env python3
"""Obtiene descripción y capítulos de YouTube sin inventar pistas. Requiere yt-dlp."""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "data/metadata.json"
STAMP = re.compile(r"(?<!\d)(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?!\d)")
LINE = re.compile(r"^\s*(?:(?:\d{1,2}[.: -]\s*)?)(?P<time>(?:\d{1,2}:)?\d{1,2}:\d{2})\s*(?:[-–—|:.)]\s*|\s+)(?P<title>\S.*)$")


def seconds(stamp):
    parts = [int(x) for x in stamp.split(":")]
    return parts[0] * 60 + parts[1] if len(parts) == 2 else parts[0] * 3600 + parts[1] * 60 + parts[2]


def chapters_from_description(description):
    found = []
    for line in description.splitlines():
        m = LINE.match(line)
        if not m:
            continue
        start = seconds(m["time"])
        title = m["title"].strip(" -–—|:")
        if title and not re.fullmatch(r"https?://\S+", title):
            found.append({"start_time": start, "title": title})
    if len(found) < 2 or any(a["start_time"] >= b["start_time"] for a, b in zip(found, found[1:])):
        return []
    return found


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--ref", action="append", help="A:1 o L:99; repetible")
    p.add_argument("--refresh", action="store_true", help="Actualizar registros ya enriquecidos")
    p.add_argument("--cookies-from-browser", help="Por ejemplo chrome o firefox")
    args = p.parse_args()
    try:
        from yt_dlp import YoutubeDL
    except ImportError:
        print("Instala yt-dlp: python -m pip install yt-dlp", file=sys.stderr)
        return 2
    data = json.loads(PATH.read_text(encoding="utf-8"))
    allowed = set(args.ref or [])
    failures = []
    for item in data["videos"]:
        if allowed and item["ref"] not in allowed:
            continue
        if not args.refresh and item.get("descriptionSource") == "yt-dlp":
            continue
        options = {"quiet": True, "no_warnings": True, "skip_download": True,
                   "extract_flat": False, "ignoreerrors": False}
        if args.cookies_from_browser:
            options["cookiesfrombrowser"] = (args.cookies_from_browser,)
        try:
            with YoutubeDL(options) as ydl:
                info = ydl.extract_info(item["youtube_url"], download=False)
            if not info:
                raise ValueError("Sin metadatos")
            description = info.get("description") or ""
            chapters = []
            for c in info.get("chapters") or []:
                if c.get("start_time") is None or not c.get("title"):
                    continue
                chapters.append({"start_time": int(c["start_time"]), "title": str(c["title"]).strip()})
            chapters.sort(key=lambda c: c["start_time"])
            source = "yt-dlp: chapters"
            if not chapters:
                chapters = chapters_from_description(description)
                source = "yt-dlp: description timestamps"
            item["description"] = description
            item["descriptionSource"] = "yt-dlp"
            item["tracklist"] = chapters
            item["tracklistSource"] = source if chapters else "not_available"
            if info.get("duration") is not None:
                item["durationSeconds"] = int(info["duration"])
            print(item["ref"] + ": " + str(len(chapters)) + " pistas")
            # Guardar después de cada vídeo para tolerar interrupciones.
            PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        except Exception as exc:
            failures.append(item["ref"])
            print(item["ref"] + ": ERROR " + str(exc).encode("ascii", "replace").decode("ascii"), file=sys.stderr)
    print("Pendientes: " + ", ".join(failures) if failures else "Consulta completada")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())

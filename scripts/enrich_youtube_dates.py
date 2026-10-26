#!/usr/bin/env python3
"""Enriquece publishedAt únicamente cuando yt-dlp obtiene una fecha verificable.
Uso: python -m pip install yt-dlp; python scripts/enrich_youtube_dates.py
No inventa fechas; preserva la clasificación existente.
"""
import json
from datetime import datetime
from pathlib import Path

try:
    import yt_dlp
except ImportError as exc:
    raise SystemExit("Instala yt-dlp: python -m pip install yt-dlp") from exc

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "data" / "metadata.json"
data = json.loads(PATH.read_text(encoding="utf-8"))
updated = 0
failed = []
opts = {"quiet": True, "no_warnings": True, "skip_download": True,
        "ignoreerrors": False, "extract_flat": False,
        "socket_timeout": 15, "retries": 2}
with yt_dlp.YoutubeDL(opts) as ydl:
    for index, item in enumerate(data.get("videos", []), 1):
        if item.get("publishedAt"):
            continue
        url = item.get("youtube_url")
        if not url:
            failed.append((item.get("ref"), "sin URL"))
            continue
        try:
            info = ydl.extract_info(url, download=False)
            raw = info.get("release_date") or info.get("upload_date")
            if not raw or len(str(raw)) != 8:
                failed.append((item.get("ref"), "fecha no disponible"))
                continue
            date = datetime.strptime(str(raw), "%Y%m%d").date().isoformat()
            item["publishedAt"] = date
            item["publishedAtSource"] = "yt-dlp: release_date" if info.get("release_date") else "yt-dlp: upload_date"
            updated += 1
            print(f"[{index}/{len(data['videos'])}] {item['ref']}: {date}", flush=True)
        except Exception as exc:
            failed.append((item.get("ref"), str(exc)[:180]))
            print(f"[{index}/{len(data['videos'])}] {item.get('ref')}: sin verificar", flush=True)
        # Persistir avances incluso si YouTube limita las consultas.
        if updated:
            PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Fechas añadidas: {updated}; pendientes: {len(failed)}")
for ref, reason in failed:
    print(f"  {ref}: {reason}")

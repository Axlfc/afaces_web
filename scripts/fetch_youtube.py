#!/usr/bin/env python3
"""Extrae metadatos públicos de @afaces sin la API oficial de YouTube."""
import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', default='https://www.youtube.com/@afaces/videos')
    parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1] / '.cache/youtube-snapshot.json')
    args = parser.parse_args()
    # El extractor entrega un snapshot bruto: nunca debe destruir la curaduría.
    curated = Path(__file__).resolve().parents[1] / 'data/metadata.json'
    if args.output.resolve() == curated.resolve():
        parser.error('Prohibido sobrescribir data/metadata.json; usa un snapshot independiente')
    try:
        import yt_dlp
    except ImportError:
        parser.error('Falta yt-dlp: python -m pip install yt-dlp')
    opts = {'quiet': True, 'no_warnings': False, 'ignoreerrors': False, 'extract_flat': False,
            'skip_download': True, 'noplaylist': False, 'retries': 3, 'extractor_retries': 3}
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(args.url, download=False)
        if not info:
            raise RuntimeError('No se recibieron metadatos')
        entries = info.get('entries')
        if entries is None:
            entries = [info]
        videos = []
        for entry in entries:
            if not entry:
                raise RuntimeError('Extracción incompleta: entrada vacía')
            if entry.get('entries') is not None:
                raise RuntimeError('Se encontró una colección anidada; proporciona la pestaña /videos o una playlist concreta')
            video_id = entry.get('id')
            if not video_id:
                raise RuntimeError('Extracción incompleta: vídeo sin ID')
            videos.append({'id': video_id, 'title': entry.get('title') or '',
                           'description': entry.get('description') or '',
                           'upload_date': entry.get('upload_date') or None})
        if not videos:
            raise RuntimeError('No se encontraron vídeos; se conserva el archivo anterior')
        videos.sort(key=lambda v: (v['upload_date'] or '', v['id']), reverse=True)
        result = {'source': args.url, 'count': len(videos), 'videos': videos}
        args.output.parent.mkdir(parents=True, exist_ok=True)
        target = args.output
        tmp = target.with_suffix(target.suffix + '.tmp')
        tmp.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        os.replace(tmp, target)
        print(f'Guardados {len(videos)} vídeos en {target}')
    except Exception as exc:
        print(f'Error de extracción: {exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())

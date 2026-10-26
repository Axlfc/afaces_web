# Sincronización del catálogo

La fuente de verdad es js/main.js: ALBUMS, LPS y AFACES_SITE.

1. Añadir el nuevo LP a LPS con n, title, vid, phase y pb.
2. Clasificarlo en AFACES_SITE.phases y en los refs de AFACES_SITE.themes cuando corresponda.
3. Ejecutar: python scripts/sync_catalog.py
4. Obtener su fecha con: python scripts/enrich_youtube_dates.py (requiere yt-dlp y acceso a YouTube).
5. Comprobar: python scripts/sync_catalog.py --check
6. Revisar git diff, commit y push.

El generador conserva publishedAt, publishedAtSource y los datos editoriales por ref. No inventa fechas ni fases. Detecta referencias duplicadas, eliminaciones y vídeos inválidos. TINET no ejecuta Python: sincronizar antes de desplegar. Las playlists externas no se modifican.

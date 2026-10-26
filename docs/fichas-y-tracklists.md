# Fichas y capítulos

Los metadatos del catálogo residen en data/metadata.json. Para incorporar descripciones y capítulos reales de YouTube:

```bash
python -m pip install yt-dlp
python scripts/enrich_youtube_chapters.py
```

Para un vídeo: `python scripts/enrich_youtube_chapters.py --ref L:99`.

Para vídeos con restricción de edad, si tienes acceso legítimo: `python scripts/enrich_youtube_chapters.py --ref L:13 --cookies-from-browser chrome`.

El script prefiere los capítulos publicados en YouTube; si no existen, interpreta líneas de la descripción con marcas de tiempo. No inventa pistas ni fechas. Guarda cada resultado inmediatamente. Para repetir: `--refresh`.

**Importante:** YouTube puede no ofrecer capítulos ni tracklist; no se inferirán títulos desde el audio. Revisa los cambios en Git antes de publicar. Las fichas de lanzamiento enlazan cada canción a YouTube en su tiempo exacto.

# Subtítulos para YouTube: SRT y WebVTT

## Preparación

1. Escucha el vídeo final publicado y transcribe las palabras audibles, sin inventar letras ni incluir instrucciones técnicas no cantadas.
2. Si utilizas reconocimiento automático, revisa manualmente idioma, puntuación, repeticiones y cada palabra.
3. Ajusta los tiempos a la línea temporal del **vídeo final**, incluidos silencios, introducciones y transiciones; no reutilices tiempos del WAV si la edición cambió.
4. Divide en bloques legibles, evita solapamientos y verifica el primer y último segmento.

## Tiempos correctos

Los subtítulos SRT usan `HH:MM:SS,mmm` (coma) y los VTT usan `HH:MM:SS.mmm` (punto). Los capítulos `MM:SS` de la descripción de YouTube **no son subtítulos**.

Ejemplo ficticio SRT (`video.es.srt`):

```srt
1
00:00:03,200 --> 00:00:06,400
[Introducción instrumental]

2
00:00:06,400 --> 00:00:09,800
Primera frase revisada.
```

Ejemplo ficticio WebVTT (`video.es.vtt`):

```vtt
WEBVTT

00:00:03.200 --> 00:00:06.400
[Introducción instrumental]

00:00:06.400 --> 00:00:09.800
Primera frase revisada.
```

## Comprobaciones

- Guarda en UTF-8; cada fin debe ser posterior a su inicio, sin tiempos negativos ni posteriores al final del vídeo.
- Comprueba acentos, legibilidad y sincronización reproduciendo el vídeo completo con el subtítulo en un reproductor compatible.
- Identifica lanzamiento (p. ej. `L:99`), vídeo, idioma, versión y responsable de revisión.

## Subir manualmente a YouTube

1. Entra en **YouTube Studio** con la cuenta administradora del vídeo.
2. Abre **Subtítulos** y selecciona el vídeo.
3. Añade **Español** como idioma si hace falta.
4. Elige **Añadir / Editar subtítulos → Subir archivo → Con tiempos** y selecciona el SRT o VTT compatible.
5. Previsualiza, corrige y publica.
6. Abre el vídeo público, activa **CC** y comprueba que el texto y los tiempos son correctos.

La ubicación exacta de las opciones puede cambiar en YouTube Studio. No marques subtítulos como publicados sin verificarlos en el vídeo público.

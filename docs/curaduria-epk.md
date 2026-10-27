# Curaduría del EPK: Esenciales para prensa

## Resultado de la revisión

El [EPK histórico](https://github.com/afaces/afaces.github.io/blob/main/epk.md) documenta **24 enlaces de listas de álbum con IDs `PLvEI`** y **tres listas automáticas de álbum con IDs `OLAK`**. Estos enlaces dan acceso a obras concretas, pero no acreditan una antología transversal para prensa. La pestaña actual de YouTube no ha podido inspeccionarse directamente, por lo que no es posible excluir otras playlists recientes no reflejadas en el repositorio.

**Decisión:** crear una lista editorial propia en `prensa.html` que ya funcione mediante enlaces a capítulos publicados, sin inventar una playlist de YouTube ni un enlace.

## Itinerario elegido: cinco cortes

| Ref. | Corte | Obra | Tramo en vídeo | Duración | Enlace |
|---|---|---|---|---|---|
| A:1 | Floating | Nefasto (2017) | 07:49–10:30 | 02:41 | [Escuchar corte](https://www.youtube.com/watch?v=SWNbhMxS4S4&t=469s) |
| A:7 | Fly | A cool name (2019) | 04:30–08:05 | 03:35 | [Escuchar corte](https://www.youtube.com/watch?v=RVxpNONLZ8o&t=270s) |
| A:22 | Distant echoes of lost loves | Not Too Bad (2021) | 29:34–32:34 | 03:00 | [Escuchar corte](https://www.youtube.com/watch?v=5D2dG7wPEGc&t=1774s) |
| A:27 | Renacer | Uncivil (2023) | 30:45–35:00 | 04:15 | [Escuchar corte](https://www.youtube.com/watch?v=b63grPuQfpw&t=1845s) |
| L:90 | RECUERDA MI NOMBRE | FRICCIÓN CERO (2026) | 00:00–03:29 | 03:29 | [Escuchar corte](https://www.youtube.com/watch?v=hm9lGhxyRuc&t=0s) |

**Duración conjunta de las cinco pistas: 17:00 (1.020 segundos).** Los enlaces llevan al capítulo inicial de cada pista dentro del vídeo íntegro del disco. No detienen automáticamente el vídeo al llegar al siguiente capítulo ni avanzan por sí mismos al siguiente elemento de esta lista.

La elección está diseñada como recorrido histórico: **2017** (inicio electrónico propio), **2019** (downtempo), **2021** (álbum catalogado como Alternative), **2023** (último álbum propio registrado) y **2026** (LP90 de EL AFACES asistido por IA, con intervención humana). **Afaces** es el catálogo de álbumes originales; **EL AFACES** identifica aquí los LP asistidos. No tratamos las dos producciones como equivalentes.

**Límite metodológico:** esta curaduría se basa en los títulos, fechas, géneros y capítulos archivados en `data/metadata.json` y las descripciones del EPK. No se ha realizado escucha comparativa de estos cinco audios, ni se ha verificado un ranking de audiencia. **Representativo no significa necesariamente «los mejores temas»**. Antes de presentarla como selección artística definitiva, el autor debe escuchar los cinco cortes y confirmar o reemplazar los que no alcancen su criterio sonoro.

## Crear también una playlist pública en YouTube

Los cinco enlaces del EPK apuntan a **capítulos de vídeos de álbumes completos**. Una playlist de YouTube formada con esos mismos cinco vídeos reproduciría **los cinco álbumes completos**, no los 17 minutos propuestos; los tiempos `t=` no son recortes persistentes de los elementos de una playlist.

Para ofrecer una playlist pública de aproximadamente 17 minutos:

1. Identificar o publicar **vídeos individuales oficiales** para los cinco cortes.
2. Crear en YouTube Studio una lista pública llamada **«Afaces — Esenciales para prensa»**.
3. Añadir esos cinco vídeos individuales en el mismo orden. Comprobar permisos y duración.
4. Revisar la reproducción de principio a fin en ventana privada antes de sustituir el enlace de la página.
5. Añadir al EPK la URL pública real sin retirar los enlaces directos a los capítulos de respaldo.

Fuente reproducible: los tests de `tests/prensa.test.cjs` cotejan las referencias, `tracklist[].start_time`, la duración hasta el siguiente capítulo y los identificadores YouTube con el catálogo de `data/metadata.json`.

Los videoclips independientes del bloque de vídeo del EPK permanecen separados de esta selección.

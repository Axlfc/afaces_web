# Haz tu propia web musical con radio

Afaces publica dos repositorios de código para estudiar y adaptar una web de artista. No necesitas un distribuidor para tener una página, un archivo y una radio propia. **El objetivo es sustituir los datos de Afaces por los tuyos; no copiar ni redistribuir su música.**

## Elige la base

| Proyecto | Tecnología y alcance |
|---|---|
| [afaces/afaces.github.io](https://github.com/afaces/afaces.github.io) | Web histórica con Jekyll/GitHub Pages, catálogo y reproductor, scripts para generar botones y listas musicales. Las instrucciones iniciales están en su README. |
| [Axlfc/afaces_web](https://github.com/Axlfc/afaces_web) | HTML, CSS y JavaScript vanilla; catálogo de lanzamientos en JSON, radio común entre páginas, navegación persistente y construcción de archivos estáticos para TINET. |

## Adaptar la web moderna

1. Haz un fork del repositorio, clónalo y crea una rama de trabajo. Cambia el nombre, contacto, enlaces a redes sociales, biografías, imágenes, metadatos SEO y demás textos de Afaces en los HTML de la raíz.
2. Edita `data/metadata.json` con **tus lanzamientos**: conserva el esquema utilizado por los scripts de la web. El validador `scripts/build_tinet.py` exige `count` coherente con el array `videos`, referencias únicas `A:n` / `L:n` consecutivas, `title`, `coleccion`, `numero`, etiquetas, fase válida y URL individual de YouTube. Si tienes otro tipo de catálogo, adapta el validador y la interfaz a tu esquema; no inventes datos para superar los tests.
3. En `js/radio-data.js`, reemplaza **todas** las entradas de `RADIO_TRACKS` con pistas de tu propia discografía y sustituye `BASE`. La versión original apunta a `afaces/afaces.github.io/assets/music/`; un fork del frontend **no aloja automáticamente los MP3** ni reproduce tus canciones si no cambias estas rutas.
4. Mantén la interfaz y el reproductor compartido (`js/radio-player.js` y `js/persistent-navigation.js`) o personalízalos. Comprueba la carga de MP3, los enlaces de descarga, la navegación sin cortes, el funcionamiento con teclado y la versión móvil.
5. Ejecuta las comprobaciones:

```bash
node --test tests/*.test.cjs
python -m unittest discover -s tests -v
python scripts/build_tinet.py --manifest
```

6. Publica los archivos estáticos generados en tu alojamiento. El flujo FTPS de TINET y sus secretos de GitHub pertenecen a la configuración original: necesitarás tu propio destino de despliegue.

## Adaptar la web histórica

Sigue la guía del [repositorio histórico](https://github.com/afaces/afaces.github.io#readme). Cambia catálogo, enlaces, reproductor y archivos musicales por los tuyos. Revisa `index.md`, `player.js`, `create_song_buttons.sh`, `create_navbar_player.sh` y el almacenamiento musical antes de desplegar GitHub Pages.

## Código público no significa música libre

El catálogo musical de **Afaces** y la radio de sus álbumes originales son independientes de **EL AFACES** y de sus LP asistidos por IA. Los MP3 originales están en un repositorio de música separado y pueden estar sujetos a límites de Git LFS. No presupongas que el catálogo viaja con un fork o que tienes permiso para republicar canciones, fotografías, portadas, marcas o material de terceros.

**Licencias elegidas:** el software original se ofrece bajo **MIT**; la documentación técnica original bajo **CC BY-SA 4.0**. Los archivos musicales, portadas, imágenes, letras, identidad de Afaces y material ajeno **no** se publican con estas licencias por el mero hecho de estar en GitHub. Consulta [LICENCIAS.md](../LICENCIAS.md) y [LICENSE](../LICENSE). Para la web histórica se propone la misma separación, pero su aplicación debe verificarse independientemente.

Los enlaces a plataformas externas son solo canales de difusión. Tu propio alojamiento, tus archivos y tus derechos son el centro.

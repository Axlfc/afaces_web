# Radio Afaces · Reproductor común (web TINET)

## Alcance

Radio musical de **Afaces**: se alimenta exclusivamente de los MP3 de los álbumes propios publicados en el repositorio de música independiente. **No** contiene ni pretende representar los LP de **EL AFACES**.

## Contrato de integración

- `js/radio-data.js`: la lista única de pistas `RADIO_TRACKS` y base `BASE`. Se extrae del catálogo anterior de la portada y preserva las 484 rutas originales. No cargar `js/main.js` en otras páginas para obtener la radio.
- `js/radio-player.js`: reproductor único, sin dependencias del catálogo editorial ni de `main.js`. Se carga en las diez páginas, siempre **después de** `radio-data.js`.
- Las diez páginas contienen exactamente una instancia del panel `radioPanel`, un `radioToggle` y sus controles (IDs detallados en `tests/test_radio_contract.py`).
- `js/discovery-shell.js` gestiona tema y cursor, pero **no** implementa otra radio ni redirige el botón Play.
- `css/styles.css` mantiene estilos compartidos y el icono de descarga explícito.

## Reproducción entre páginas

En la primera carga la web permanece HTML estático. Al seguir un enlace interno a otra
sección, js/persistent-navigation.js mantiene el único Audio y su panel en la ventana
principal, y presenta las páginas editoriales en un iframe del mismo origen. Cada
sección sigue ejecutando sus scripts normales sin destruir la radio.

El botón RADIO de cada página embebida se comunica con el reproductor principal.
El historial visible se actualiza con History API y Atrás/Adelante navega solo
el contenido del iframe; se conservan pista, posición real, reproducción, volumen,
aleatorio y panel. Las URL directas también funcionan.

Se excluyen enlaces externos, descarga, abrir en pestaña nueva y clics modificados.
Si se desactiva JavaScript se usa la navegación HTML normal, sin continuidad.
Recargar completamente la página, cerrar la pestaña, salir de AFACES, límites del
navegador o MP3 ausentes en el hosting externo pueden cortar la radio. En recarga
completa, sessionStorage solo restaura el tiempo en pausa para respetar autoplay.

Verificación manual: Play -> Perfiles -> Mapa -> Fichas -> Atrás; comprobar
audio sin cortes, botón RADIO, hash y query parameters, enlaces externos,
tema, móvil y apertura de menú.

## Descarga MP3

El botón de descarga de cada pista es un enlace HTML directo al mismo MP3 original
que antes se mostraba como «Abrir MP3 original». Tiene el tooltip y nombre accesible
`Descargar MP3 (descargar NOMBRE DE LA CANCIÓN)`, un SVG de descarga, `target="_blank"`
y `rel="noopener noreferrer"`. No realiza un `fetch` CORS, no muestra el aviso
engañoso de error y no interrumpe la reproducción de radio.

El navegador y el servidor externo determinan si el enlace provoca una descarga
automática o abre el archivo para guardarlo manualmente. Un 404 o un problema con
Git LFS no se puede resolver desde este enlace sin cambiar el alojamiento.


No se copian MP3 al FTP TINET. El GitHub independiente con ficheros de la radio puede seguir teniendo restricciones LFS; un audio ausente en origen no puede repararse con un cambio de frontend.

## Validación y despliegue

```bash
node --test tests/*.test.cjs
python -m unittest discover -s tests -v
python scripts/build_tinet.py --manifest
```

GitHub Actions ejecuta estos controles, construye un sitio estático versionado por hash y publica a TINET por FTPS al fusionar en `master`. La verificación HTTP posterior cubre los recursos propios publicados, no certifica la disponibilidad de cada MP3 alojado externamente.

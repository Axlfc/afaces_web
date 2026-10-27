# Afaces · web musical independiente con radio

Sitio estático en **HTML, CSS y JavaScript vanilla** con catálogo estructurado, fichas, cronología y radio musical compartida entre páginas. Su objetivo también es práctico: cualquier artista puede estudiar el proyecto, hacer un fork del **código** y construir su propia web musical sin delegar el alojamiento y la presentación de su catálogo en un distribuidor.

## Empezar

1. Haz un fork y clona tu copia.
2. Sustituye las biografías, nombre artístico, URLs de publicación, imágenes y datos de `data/metadata.json` por los tuyos.
3. Cambia `BASE` y `RADIO_TRACKS` en `js/radio-data.js` para conectar tu propia música; no reutilices automáticamente los MP3 de Afaces.
4. Prueba la web y el paquete estático:

```bash
node --test tests/*.test.cjs
python -m unittest discover -s tests -v
python scripts/build_tinet.py --manifest
```

5. Publica en tu propio alojamiento. El desplegador a TINET forma parte de la configuración original de Afaces y requiere tus propias credenciales y destino.

Consulta la [guía para artistas](docs/para-artistas.md), el [contrato técnico de la radio](docs/radio-compartida.md) y las [instrucciones de despliegue](docs/despliegue-tinet.md).

## Licencias y contenido

- **Código original: [MIT](LICENSE).** Puedes modificarlo, distribuirlo y utilizarlo también en proyectos comerciales, conservando los avisos correspondientes.
- **Guías técnicas originales: CC BY-SA 4.0.** Puedes adaptarlas con atribución y CompartirIgual.
- **Grabaciones, letras, portadas, fotografías, marcas, textos de la obra y demás elementos artísticos de Afaces: derechos reservados.** No se transfieren con el permiso de usar el software.
- **Recursos de terceros:** conservan sus propias licencias.

Lee el [alcance y las condiciones](LICENCIAS.md) antes de publicar tu fork.

La radio Afaces está vinculada a los **álbumes originales de Afaces**, no al catálogo de LP de **EL AFACES**. El alojamiento separado de MP3 puede tener restricciones de Git LFS.

## Repositorio histórico

El proyecto histórico [afaces/afaces.github.io](https://github.com/afaces/afaces.github.io) contiene la primera web musical, también con radio. Se puede usar como base de un proyecto distinto, sustituyendo los datos, la identidad y las pistas.

# Despliegue TINET — AFACES Web

## Flujo
- Cada PR valida la sincronización del catálogo y genera el artefacto `afaces-tinet-site`.
- Cada push a `master` y cada ejecución manual pueden publicar la web, **solo** cuando `TINET_DEPLOY_ENABLED=true`.
- `scripts/build_tinet.py` copia exclusivamente HTML de raíz y directorios `assets/`, `css/`, `js/`, `data/`; no copia scripts ni credenciales.
- El FTP se actualiza sin `--delete`. No se borran ficheros remotos desconocidos.
- Las publicaciones se serializan con `concurrency`.

## Configuración inicial obligatoria
En Settings > Secrets and variables > Actions:
- Secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
- Variables: `TINET_REMOTE_DIR` (ruta **absoluta** del directorio que sirve la web, comprobada en el FTP), `TINET_PUBLIC_URL` (por ejemplo `https://usuaris.tinet.cat/~afaces/welcome.html`), `TINET_FTP_PORT` (opcional, 21).
- Crear el environment `tinet-production` con protección/aprobación si se desea.
- Mantener `TINET_DEPLOY_ENABLED` sin definir hasta validar credenciales, directorio remoto y una primera publicación supervisada; establecerla a `true` para activar.

**Aviso:** el cliente permite FTP sin TLS cuando el servidor no lo ofrece. Antes de activar, verificar si TINET admite FTPS; evitar publicar credenciales por FTP plano si existe una opción segura.

## Publicación de LP
1. Actualizar el catálogo fuente `js/main.js` y añadir metadatos editoriales.
2. Ejecutar `python scripts/sync_catalog.py` y `python scripts/build_tinet.py --manifest`.
3. Abrir PR; revisar las validaciones.
4. Fusionar en `master`; con el despliegue activado, Actions construye y sube `dist/`.
5. Verificar la página pública y el lanzamiento nuevo.

## Limitaciones
- La integración directa con Music Forge requiere acordar un contrato de intercambio y credenciales separadas; no está implementada aquí.
- La verificación HTTP comprueba disponibilidad, no equivalencia de contenido ni todas las rutas.
- El despliegue no realiza backup remoto: hacer una copia inicial del FTP antes de habilitarlo.

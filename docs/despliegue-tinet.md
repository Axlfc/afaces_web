# Publicación reproducible de AFACES en TINET

## Estado y garantías
El código no equivale a una publicación en producción. El workflow de FTPS se activa
solo con la variable de repositorio `TINET_DEPLOY_ENABLED=true`. Cada PR se valida
automáticamente en un **git worktree temporal independiente**; el despliegue no utiliza
credenciales en los eventos de PR.

El catálogo y las páginas se comprueban antes de publicar: etiquetas, fases,
referencias, IDs de YouTube, capítulos, enlaces locales y hashes de los recursos.
El generador solo permite HTML en raíz y recursos públicos de `assets/`, `css/`,
`js/` y archivos JSON de `data/`. No publica scripts, credenciales o informes internos.
Un `index.html` redirige a `welcome.html`, portada preferida por TINET.

## Configuración de GitHub
Settings → Secrets and variables → Actions:
- Secrets: `FTP_USERNAME` y `FTP_PASSWORD` (obligatorios);
  `FTP_SERVER` (opcional, valor por defecto `usuaris.tinet.cat`).
- Variables: `TINET_REMOTE_DIR` (por defecto `html`),
  `TINET_FTP_PORT` (por defecto 21),
  `TINET_PUBLIC_URL` (por defecto `https://usuaris.tinet.cat/~afaces/`),
  `TINET_DEPLOY_ENABLED` (no activar hasta comprobar los secretos).
- Environment: `tinet-production`. Puede protegerse con aprobación para el primer
  despliegue; no expongas la contraseña en issues, PR, chats ni commits.

**TINET confirma que los archivos públicos deben almacenarse en la carpeta
`html` del FTP `usuaris.tinet.cat:21` y recomienda TLS explícito**:
https://www.tinet.cat/serveis/espai-web-ftp

Si el FTP abre directamente en `html/`, `TINET_REMOTE_DIR=.` es admisible;
en ambos casos el programa exige que el directorio contenga `welcome.html`
antes de escribir. Una ruta distinta se rechaza para evitar publicar fuera de la web.
No desactiva la validación TLS ni permite FTP en claro.

## Publicar un LP
1. Actualizar los datos fuente en `js/main.js` y editar `data/metadata.json`
   preservando la intervención y procedencia editorial.
2. Ejecutar `python scripts/sync_catalog.py`.
3. Trabajar en una rama aislada con `bash scripts/worktree.sh new feat/lp-100`
   y abrir PR contra `master`.
4. CI ejecuta unittest, validación de catálogo, construcción y smoke HTTP dentro
   de un worktree temporal. Genera el artefacto `afaces-tinet-site`.
5. Fusionar la PR validada en `master`. Si `TINET_DEPLOY_ENABLED=true`,
   el workflow publica por FTPS solo los archivos cuyo hash haya cambiado.
6. El despliegue hace copia local de los ficheros remotos sobrescritos y publica
   `deploy-manifest.json` al final. GitHub conserva la copia 14 días.
7. Verifica por HTTP y SHA-256 todas las páginas y los recursos esenciales.
   Una discrepancia deja el workflow en rojo para permitir reparar o restaurar.

No se ejecuta `rm`, `--delete` ni una limpieza del FTP remoto. El primer
despliegue no elimina archivos antiguos que no estén en el paquete.
**Una publicación FTP no ofrece transacción atómica global.** Los recursos
se transfieren antes del HTML para reducir ventanas de inconsistencia.

## Prueba manual
```bash
bash scripts/worktree.sh list
python -m unittest discover -s tests -v
python scripts/sync_catalog.py --check
python scripts/build_tinet.py --manifest
python scripts/deploy_tinet.py --dist dist --dry-run
python -m http.server 8000 --directory dist
# otra terminal
python scripts/verify_tinet.py --base-url http://127.0.0.1:8000/ --all
```

### Límites
- La conexión con credenciales reales y el contenido público servido por TINET
  deben comprobarse tras activar la publicación. Ningún test local prueba el FTP real.
- La importación automática desde `afaces_music_forge` requiere un contrato
  y un mecanismo de autenticación entre repositorios. No está conectada aquí.
- No se eliminan ramas históricas: las revisadas estaban totalmente integradas
  y no había commits exclusivos que recuperar.

## Recuperación
Si el sitio remoto fue modificado o le falta un fichero pese a que el manifiesto
lo marca como sincronizado: Actions → "Publicar AFACES en TINET (FTPS)" →
"Run workflow" sobre master → marcar `force_full=true`. Se volverá a transferir
todo el paquete y se conservará copia de los archivos reemplazados.

# Pendiente: licenciar el repositorio histórico

Repositorio: [afaces/afaces.github.io](https://github.com/afaces/afaces.github.io), rama principal **main**.

## Por qué no se ha aplicado remotamente

El 27 de octubre de 2026, la conexión GitHub usada para esta PR puede leer el repositorio, pero GitHub rechaza con **403 Resource not accessible by integration** tanto la creación de una rama como la creación de LICENSE. La otra conexión disponible es de solo lectura. **No se ha modificado el repositorio histórico.**

Los cambios están preparados en el script [scripts/apply_legacy_licenses.py](../scripts/apply_legacy_licenses.py). La herramienta únicamente crea o actualiza estos cinco archivos de texto del clon histórico:

- LICENSE — MIT para software original.
- LICENCIAS.md — CC BY-SA 4.0 para documentación técnica original, derechos reservados para materiales artísticos y licencias propias de terceros.
- README.md — instrucciones visibles de reutilización del código y restricciones del catálogo.
- epk.md — bloque de código reutilizable, preservando el aviso que dirige al EPK moderno.
- CONTRIBUTING.md — reglas para futuras aportaciones.

## Uso cuando haya permisos de GitHub adecuados

```bash
git clone https://github.com/afaces/afaces.github.io.git
cd afaces.github.io
git switch -c feat/licencias-web-radio
python /ruta/a/afaces_web/scripts/apply_legacy_licenses.py .          # Vista previa
python /ruta/a/afaces_web/scripts/apply_legacy_licenses.py . --apply  # Aplica
git diff --check
git diff --stat
git diff -- README.md epk.md CONTRIBUTING.md
git add LICENSE LICENCIAS.md README.md epk.md CONTRIBUTING.md
git commit -m "docs(license): código MIT y guías CC BY-SA, catálogo protegido"
git push -u origin feat/licencias-web-radio
```

Abre una PR desde `feat/licencias-web-radio` a `main`, comprueba que los medios no cambian y después fusiona. Revisa la atribución de posibles contribuciones previas y de Bootstrap, Bootswatch y otros materiales externos: no se les aplica unilateralmente MIT ni CC BY-SA.

El script es idempotente; en caso de que LICENSE o LICENCIAS.md existentes sean diferentes, **aborta** en lugar de sustituirlos. No toca música, imágenes, reproductor ni archivos de configuración.

## Requisito de acceso

Autorizar la instalación de GitHub para escribir en `afaces/afaces.github.io` o realizar el cambio desde un clon local con credenciales que sí puedan publicar ramas. El repositorio moderno no necesita otorgar acceso a terceros a los archivos musicales.

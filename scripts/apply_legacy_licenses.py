#!/usr/bin/env python3
"""Prepara una licencia dual de software/documentación en un clon de la web histórica.

Sin --apply, muestra los archivos a cambiar. Nunca toca música, imágenes ni radio.
"""
from __future__ import annotations

import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LICENSE_TITLE = "## Licencias y reutilización del proyecto"
EPK_TITLE = "## Código abierto para otras webs musicales"
CONTRIB_TITLE = "## Condiciones de las contribuciones"

RIGHTS = """# Licencias y derechos de Afaces · web histórica

El repositorio permite reutilizar el **código**, no redistribuir la **discografía**.

| Material | Condiciones |
|---|---|
| Software original de Afaces: plantillas, scripts, reproductor, JavaScript, CSS, Jekyll, HTML estructural | **MIT**. Véase [LICENSE](LICENSE). Puedes modificar, distribuir y publicar el software, incluso comercialmente, manteniendo el aviso de licencia. |
| Manuales y documentación técnica originales escritos para instalar, configurar o modificar el software | **CC BY-SA 4.0**. Puedes adaptarlos con atribución, indicación de cambios y CompartirIgual. [Resumen](https://creativecommons.org/licenses/by-sa/4.0/deed.es) · [licencia legal](https://creativecommons.org/licenses/by-sa/4.0/legalcode). |
| Grabaciones, letras, portadas, fotos, biografías artísticas, identidad visual y marcas de Afaces / EL AFACES | **Todos los derechos reservados**, salvo consentimiento u otra licencia expresa aplicable a cada obra. |
| Bootstrap, Bootswatch, librerías, tipografías, iconos y demás materiales de terceros | Conservan **sus propias licencias**. Afaces no puede relicenciar contenido de terceros. |

## Haz una web musical independiente

1. Haz un fork del código original, conserva el aviso MIT y usa tu propia identidad artística.
2. Sustituye la discografía, imágenes, contactos, URLs y textos de Afaces.
3. Configura la radio con tus propias grabaciones: revisa \`player.js\`, \`index.md\` y los scripts generadores. El repositorio musical histórico puede depender de Git LFS.
4. Verifica accesibilidad, funcionamiento de la radio, permisos de música y despliegue en tu alojamiento.
5. Si adaptas una guía técnica original, atribuye «Afaces / Axel Fernández Curros», enlaza a la fuente y a CC BY-SA 4.0 e indica tus cambios.

La licencia MIT cubre el **software original**, no los elementos creativos que aparezcan incrustados en las plantillas o metadatos. Los materiales de terceros conservan sus licencias. El alojamiento de MP3 no se transfiere por hacer fork.

También puedes utilizar la [web moderna con radio](https://github.com/Axlfc/afaces_web), bajo esta misma separación de código/documentación/catálogo. La radio contiene álbumes **Afaces**, no los LP de **EL AFACES**.
"""

README_BLOCK = """## Licencias y reutilización del proyecto

- **Software original: MIT** ([LICENSE](LICENSE)). Puedes modificar el código para tu propio proyecto, mantenerlo y publicarlo bajo tu marca, conservando el aviso MIT.
- **Guías técnicas originales: CC BY-SA 4.0**, con atribución y CompartirIgual.
- **Música, fotos, letras, portadas e identidad Afaces: derechos reservados.** No se ceden con el software. Usa tus propias pistas.
- **Recursos de terceros:** conservan sus licencias originales.

[Condiciones y guía de adaptación](LICENCIAS.md) · [Web moderna con radio](https://github.com/Axlfc/afaces_web).

"""

EPK_BLOCK = """## Código abierto para otras webs musicales

No tienes que utilizar un distribuidor para tener tu web y tu radio. El [código de esta web](https://github.com/afaces/afaces.github.io) y el de la [web moderna](https://github.com/Axlfc/afaces_web) se ofrecen para crear proyectos independientes.

**MIT para software original · CC BY-SA 4.0 para guías técnicas originales.** Los derechos sobre canciones, fotografías, portadas e identidad artística se mantienen reservados. [Licencias y condiciones](https://github.com/afaces/afaces.github.io/blob/main/LICENCIAS.md).

"""

CONTRIB_BLOCK = """## Condiciones de las contribuciones

El código original propuesto se incorpora al proyecto bajo **MIT**; los cambios en las guías técnicas originales bajo **CC BY-SA 4.0**. No incluyas grabaciones, portadas, fotografías ni recursos de terceros sin permiso. Consulta [LICENSE](LICENSE) y [LICENCIAS.md](LICENCIAS.md). Las aportaciones anteriores de otros titulares mantienen los derechos que correspondan.
"""


def prepare(destination: Path, mit_text: str) -> dict[str, str]:
    """Devuelve el contenido completo de cinco archivos sin escribir nada."""
    if not destination.is_dir():
        raise ValueError("El destino no existe o no es un directorio")
    read = {}
    for filename in ("README.md", "epk.md", "CONTRIBUTING.md"):
        p = destination / filename
        if not p.is_file():
            raise ValueError(f"No parece un clon histórico: falta {filename}")
        read[filename] = p.read_text(encoding="utf-8")

    files = {"LICENSE": mit_text, "LICENCIAS.md": RIGHTS}
    for filename, new_content in files.items():
        p = destination / filename
        if p.exists() and p.read_text(encoding="utf-8") != new_content:
            raise ValueError(f"{filename} ya existe con otro contenido: revísalo manualmente")

    readme = read["README.md"]
    if LICENSE_TITLE not in readme:
        marker = "## 🖋 Autor"
        if marker in readme:
            readme = readme.replace(marker, README_BLOCK + marker, 1)
        else:
            readme = readme.rstrip() + "\n\n" + README_BLOCK
    readme = readme.replace(
        "Libre para que cualquiera lo use, lo modifique y lo propague.",
        "El código original se publica bajo MIT. La música, imágenes e identidad Afaces conservan sus derechos.",
    )
    files["README.md"] = readme

    epk = read["epk.md"]
    if EPK_TITLE not in epk:
        marker = "## Afaces Electronic Press Kit"
        if marker in epk:
            epk = epk.replace(marker, EPK_BLOCK + marker, 1)
        else:
            epk = epk.rstrip() + "\n\n" + EPK_BLOCK
    files["epk.md"] = epk

    contributing = read["CONTRIBUTING.md"]
    if CONTRIB_TITLE not in contributing:
        contributing = contributing.rstrip() + "\n\n" + CONTRIB_BLOCK
    files["CONTRIBUTING.md"] = contributing
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("repo", type=Path, help="Ruta a tu clon de afaces/afaces.github.io")
    parser.add_argument("--apply", action="store_true", help="Aplicar; sin esta opción solo revisar")
    args = parser.parse_args()
    destination = args.repo.expanduser().resolve()
    files = prepare(destination, (ROOT / "LICENSE").read_text(encoding="utf-8"))
    pending = [
        (name, content) for name, content in files.items()
        if not (destination / name).exists()
        or (destination / name).read_text(encoding="utf-8") != content
    ]
    for filename, _ in pending:
        print(("MODIFICAR" if args.apply else "PREVISTO") + ": " + filename)
    if not pending:
        print("Sin cambios: la migración ya está aplicada")
    if args.apply:
        for filename, content in pending:
            (destination / filename).write_text(content, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

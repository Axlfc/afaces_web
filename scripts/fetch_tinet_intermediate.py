#!/usr/bin/env python3
"""Obtiene el intermedio público Sectigo OV R36 en runtime, nunca en Git."""
import argparse
import hashlib
import os
import ssl
import sys
import tempfile
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

from scripts.deploy_tinet import SECTIGO_OV_R36_SHA256

# Sectigo publica el .crt por HTTP. Se intenta HTTPS primero; el fallback
# oficial HTTP es seguro frente a sustituciones gracias al SHA-256 DER fijado.
_CERT_PATH = "SectigoPublicServerAuthenticationCAOVR36.crt"
URLS = (
    "https://crt.sectigo.com/" + _CERT_PATH,
    "http://crt.sectigo.com/" + _CERT_PATH,
)
MAX_CERT_BYTES = 8192


def fetch_intermediate(destination):
    """Descarga, valida la huella DER y escribe un único PEM público (0600)."""
    destination = Path(destination).resolve()
    repository_root = Path(__file__).resolve().parents[1]
    if destination.is_relative_to(repository_root):
        raise ValueError("No se permite guardar certificados dentro del repositorio")

    last_error = None
    for url in URLS:
        try:
            with urlopen(url, timeout=25) as response:
                raw = response.read(MAX_CERT_BYTES + 1)
        except (OSError, URLError) as exc:
            last_error = exc
            continue
        if len(raw) > MAX_CERT_BYTES:
            raise ValueError("La descarga del certificado excede el tamaño permitido")
        if raw.startswith(b"-----BEGIN CERTIFICATE-----"):
            try:
                raw_text = raw.decode("ascii")
                if (raw_text.count("-----BEGIN CERTIFICATE-----") != 1
                        or raw_text.count("-----END CERTIFICATE-----") != 1
                        or "PRIVATE KEY" in raw_text):
                    raise ValueError("El contenido no es un único certificado público")
                der = ssl.PEM_cert_to_DER_cert(raw_text)
            except (ValueError, UnicodeError, ssl.SSLError) as exc:
                raise ValueError("PEM descargado no válido") from exc
        else:
            der = raw
        if hashlib.sha256(der).hexdigest() != SECTIGO_OV_R36_SHA256:
            raise ValueError("Huella SHA-256 Sectigo inesperada; descarga rechazada")
        pem = ssl.DER_cert_to_PEM_cert(der)
        destination.parent.mkdir(parents=True, exist_ok=True)
        fd, temporary = tempfile.mkstemp(prefix=".sectigo-", dir=destination.parent)
        try:
            with os.fdopen(fd, "w", encoding="ascii") as stream:
                stream.write(pem)
            os.chmod(temporary, 0o600)
            os.replace(temporary, destination)
        finally:
            if os.path.exists(temporary):
                os.unlink(temporary)
        print("OK: intermedio Sectigo público validado y escrito en directorio temporal")
        return destination
    raise OSError("No se pudo obtener el certificado intermedio oficial") from last_error


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True, help="Destino fuera del repositorio")
    args = parser.parse_args()
    try:
        fetch_intermediate(args.output)
        return 0
    except (OSError, ValueError) as exc:
        print("ERROR CERTIFICADO:", exc, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())

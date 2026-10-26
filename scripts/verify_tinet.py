#!/usr/bin/env python3
"""Comprueba por SHA-256 que el sitio HTTP entrega los archivos de dist/."""
import argparse
import hashlib
import json
import sys
import time
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen


def verify(base_url, manifest_path, all_files=False, attempts=3):
    manifest = json.loads(Path(manifest_path).read_text(encoding="utf-8"))
    if manifest.get("schema_version") != 1:
        raise ValueError("Manifiesto incompatible")
    all_sums = manifest["files"]
    names = sorted(all_sums if all_files else (
        n for n in all_sums if n.endswith(".html") or n in (
            "data/metadata.json", "js/main.js", "css/styles.css", "data/routes.json"
        )
    ))
    if attempts < 1 or not names or not base_url.startswith(("http://", "https://")):
        raise ValueError("URL o manifiesto no válido")
    base_url = base_url.rstrip("/") + "/"
    errors = []
    for name in names:
        url = base_url + quote(name, safe="/") + "?afaces_verify=" + all_sums[name][:12]
        last_error = None
        for n in range(attempts):
            try:
                request = Request(url, headers={"Cache-Control": "no-cache", "Accept-Encoding": "identity"})
                with urlopen(request, timeout=25) as response:
                    body = response.read()
                actual = hashlib.sha256(body).hexdigest()
                if actual != all_sums[name]:
                    raise ValueError(f"Hash incorrecto: {name}")
                last_error = None
                break
            except (OSError, ValueError) as exc:
                last_error = exc
                if n < attempts - 1:
                    time.sleep(2)
        if last_error:
            errors.append(f"{name}: {last_error}")
    if errors:
        raise ValueError("Publicación incoherente:\n" + "\n".join(errors))
    print(f"OK: {len(names)} recursos HTTP verificados por SHA-256")
    return len(names)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", required=True)
    parser.add_argument("--manifest", default="dist/deploy-manifest.json")
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--retries", type=int, default=3)
    args = parser.parse_args()
    try:
        verify(args.base_url, args.manifest, args.all, args.retries)
    except (OSError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print("ERROR:", exc, file=sys.stderr)
        raise SystemExit(1)

import hashlib
import io
import os
import ssl
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.error import URLError

from scripts.fetch_tinet_intermediate import URLS, fetch_intermediate


class SectigoRuntimeTests(unittest.TestCase):
    def setUp(self):
        self.der = ssl.create_default_context().get_ca_certs(binary_form=True)[0]
        self.digest = hashlib.sha256(self.der).hexdigest()

    def test_fetch_der_verified_without_pem_in_git(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / "sectigo_intermediate.pem"
            with patch("scripts.fetch_tinet_intermediate.SECTIGO_OV_R36_SHA256",
                       self.digest), patch(
                           "scripts.fetch_tinet_intermediate.urlopen",
                           return_value=io.BytesIO(self.der)
                       ) as opener:
                self.assertEqual(fetch_intermediate(target), target)
            self.assertEqual(
                ssl.PEM_cert_to_DER_cert(target.read_text(encoding="ascii")),
                self.der
            )
            self.assertEqual(opener.call_count, 1)
            if os.name == "posix":
                self.assertEqual(target.stat().st_mode & 0o777, 0o600)

    def test_bad_hash_fails_closed_without_creating_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / "reject.pem"
            with patch("scripts.fetch_tinet_intermediate.urlopen",
                       return_value=io.BytesIO(self.der)):
                with self.assertRaisesRegex(ValueError, "Huella SHA-256"):
                    fetch_intermediate(target)
            self.assertFalse(target.exists())

    def test_https_failure_uses_pinned_official_fallback(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / "sectigo_intermediate.pem"
            with patch("scripts.fetch_tinet_intermediate.SECTIGO_OV_R36_SHA256",
                       self.digest), patch(
                           "scripts.fetch_tinet_intermediate.urlopen",
                           side_effect=[URLError("HTTPS unavailable"), io.BytesIO(self.der)]
                       ) as opener:
                fetch_intermediate(target)
            self.assertEqual(opener.call_count, 2)
            self.assertEqual(opener.call_args.args[0], URLS[1])

    def test_no_certificate_may_be_written_in_repository(self):
        inside_repo = Path(__file__).resolve().parents[1] / "certs" / "never.pem"
        with self.assertRaisesRegex(ValueError, "repositorio"):
            fetch_intermediate(inside_repo)


if __name__ == "__main__":
    unittest.main()

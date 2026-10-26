import hashlib
import io
import json
import ssl
import tempfile
import unittest
from pathlib import Path

from scripts.deploy_tinet import discover_webroot, make_ftps_context, plan, publish


class FakeFTP:
    def __init__(self):
        self.cwd_path = "/"
        self.data = {"/welcome.html": b"old"}
        self.dirs = {"/"}

    def cwd(self, path):
        import posixpath
        dest = posixpath.normpath(posixpath.join(self.cwd_path, path))
        if dest not in self.dirs:
            from ftplib import error_perm
            raise error_perm("550 No such directory")
        self.cwd_path = dest

    def pwd(self):
        return self.cwd_path

    def nlst(self):
        prefix = self.cwd_path.rstrip("/") + "/"
        names = {p[len(prefix):].split("/", 1)[0] for p in self.data if p.startswith(prefix)}
        names.update({p[len(prefix):].split("/", 1)[0] for p in self.dirs
                      if p.startswith(prefix) and p != self.cwd_path})
        return sorted(names)

    def retrbinary(self, command, callback):
        from ftplib import error_perm
        key = self.cwd_path.rstrip("/") + "/" + command.removeprefix("RETR ")
        if key not in self.data:
            raise error_perm("550 Missing file")
        callback(self.data[key])

    def mkd(self, name):
        self.dirs.add(self.cwd_path.rstrip("/") + "/" + name)

    def storbinary(self, command, stream):
        self.data[self.cwd_path.rstrip("/") + "/" + command.removeprefix("STOR ")] = stream.read()


class FTPTests(unittest.TestCase):
    def test_plan_updates_only_new_and_html_last(self):
        files = {"welcome.html": "new", "js/main.js": "same", "data/metadata.json": "new"}
        self.assertEqual(plan(files, {"js/main.js": "same"}),
                         ["data/metadata.json", "welcome.html"])

    def test_target_guard_blocks_wrong_root(self):
        with tempfile.TemporaryDirectory() as tmp:
            dist = Path(tmp)
            (dist / "deploy-manifest.json").write_text(json.dumps({"schema_version": 1, "files": {}}))
            with self.assertRaisesRegex(ValueError, "TINET_REMOTE_DIR"):
                publish(FakeFTP(), dist, "/etc", dist / "backup")

    def test_backup_then_upload(self):
        with tempfile.TemporaryDirectory() as tmp:
            dist = Path(tmp)
            (dist / "data").mkdir()
            (dist / "data" / "metadata.json").write_bytes(b"new")
            (dist / "welcome.html").write_bytes(b"updated")
            hashes = {
                "data/metadata.json": hashlib.sha256(b"new").hexdigest(),
                "welcome.html": hashlib.sha256(b"updated").hexdigest(),
            }
            (dist / "deploy-manifest.json").write_text(json.dumps({
                "schema_version": 1, "files": hashes
            }))
            ftp = FakeFTP()
            changed = publish(ftp, dist, ".", dist / "backup")
            self.assertEqual(changed, 2)
            self.assertEqual(ftp.data["/data/metadata.json"], b"new")
            self.assertEqual(ftp.data["/welcome.html"], b"updated")
            self.assertEqual((dist / "backup" / "welcome.html").read_bytes(), b"old")


    def test_repair_missing_file_with_unchanged_manifest(self):
        with tempfile.TemporaryDirectory() as tmp:
            dist = Path(tmp)
            (dist / "data").mkdir()
            (dist / "data" / "metadata.json").write_bytes(b"new")
            (dist / "welcome.html").write_bytes(b"updated")
            hashes = {
                "data/metadata.json": hashlib.sha256(b"new").hexdigest(),
                "welcome.html": hashlib.sha256(b"updated").hexdigest(),
            }
            manifest = json.dumps({"schema_version": 1, "files": hashes}).encode()
            (dist / "deploy-manifest.json").write_bytes(manifest)
            ftp = FakeFTP()
            ftp.data["/welcome.html"] = b"updated"
            ftp.data["/deploy-manifest.json"] = manifest
            self.assertEqual(publish(ftp, dist, ".", dist / "backup"), 1)
            self.assertEqual(ftp.data["/data/metadata.json"], b"new")

    def test_remote_manual_modification_is_repaired_and_backed_up(self):
        with tempfile.TemporaryDirectory() as tmp:
            dist = Path(tmp)
            (dist / "welcome.html").write_bytes(b"canonical")
            digest = hashlib.sha256(b"canonical").hexdigest()
            manifest = json.dumps({
                "schema_version": 1, "files": {"welcome.html": digest}
            }).encode()
            (dist / "deploy-manifest.json").write_bytes(manifest)
            ftp = FakeFTP()
            ftp.data["/welcome.html"] = b"changed by hand"
            ftp.data["/deploy-manifest.json"] = manifest
            count = publish(ftp, dist, ".", dist / "backup")
            self.assertEqual(count, 1)
            self.assertEqual(ftp.data["/welcome.html"], b"canonical")
            self.assertEqual((dist / "backup" / "welcome.html").read_bytes(),
                             b"changed by hand")

    def test_auto_detects_html_when_login_root_is_not_public(self):
        with tempfile.TemporaryDirectory() as tmp:
            dist = Path(tmp)
            (dist / "welcome.html").write_bytes(b"new")
            digest = hashlib.sha256(b"new").hexdigest()
            (dist / "deploy-manifest.json").write_text(json.dumps({
                "schema_version": 1, "files": {"welcome.html": digest}
            }))
            ftp = FakeFTP()
            ftp.data.clear()
            ftp.dirs.add("/html")
            ftp.data["/html/welcome.html"] = b"old"
            self.assertEqual(publish(ftp, dist, "auto", dist / "backup"), 1)
            self.assertEqual(ftp.data["/html/welcome.html"], b"new")
            self.assertNotIn("/welcome.html", ftp.data)

    def test_auto_fails_closed_when_both_locations_have_welcome(self):
        ftp = FakeFTP()
        ftp.dirs.add("/html")
        ftp.data["/html/welcome.html"] = b"other site"
        with self.assertRaisesRegex(ValueError, "inequívoca"):
            discover_webroot(ftp, "auto")
        self.assertEqual(ftp.data["/html/welcome.html"], b"other site")

    def test_auto_fails_closed_when_neither_location_has_welcome(self):
        ftp = FakeFTP()
        ftp.data.clear()
        ftp.dirs.add("/html")
        with self.assertRaisesRegex(ValueError, "inequívoca"):
            discover_webroot(ftp, "auto")

    def test_html_folder_is_not_an_accepted_target(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaisesRegex(ValueError, "TINET_REMOTE_DIR"):
                publish(FakeFTP(), Path(tmp), "html", Path(tmp) / "backup")

    def test_missing_welcome_fails_before_upload(self):
        with tempfile.TemporaryDirectory() as tmp:
            ftp = FakeFTP()
            ftp.data.clear()
            with self.assertRaisesRegex(ValueError, "welcome.html"):
                publish(ftp, Path(tmp), ".", Path(tmp) / "backup")

    def test_manifest_hash_mismatch_fails_before_upload(self):
        with tempfile.TemporaryDirectory() as tmp:
            dist = Path(tmp)
            (dist / "welcome.html").write_bytes(b"new")
            (dist / "deploy-manifest.json").write_text(json.dumps({
                "schema_version": 1, "files": {"welcome.html": "0" * 64}
            }))
            ftp = FakeFTP()
            with self.assertRaisesRegex(ValueError, "Hash local incoherente"):
                publish(ftp, dist, ".", dist / "backup")
            self.assertEqual(ftp.data["/welcome.html"], b"old")




    def test_ftps_context_keeps_hostname_and_ca_validation(self):
        context = make_ftps_context()
        self.assertTrue(context.check_hostname)
        self.assertEqual(context.verify_mode, ssl.CERT_REQUIRED)
        self.assertGreater(len(context.get_ca_certs()), 0)

    def test_ftps_context_rejects_unpinned_certificate(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "unexpected.pem"
            path.write_text("-----BEGIN CERTIFICATE-----\nQUJD\n-----END CERTIFICATE-----\n")
            with self.assertRaisesRegex(ValueError, "Huella SHA-256"):
                make_ftps_context(path)


if __name__ == "__main__":
    unittest.main()

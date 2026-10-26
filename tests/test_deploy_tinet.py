import hashlib
import io
import json
import tempfile
import unittest
from pathlib import Path

from scripts.deploy_tinet import plan, publish


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
        return [p.rsplit("/", 1)[-1] for p in self.data if p.startswith(self.cwd_path + "/")]

    def retrbinary(self, command, callback):
        from ftplib import error_perm
        key = self.cwd_path + "/" + command.removeprefix("RETR ")
        if key not in self.data:
            raise error_perm("550 Missing file")
        callback(self.data[key])

    def mkd(self, name):
        self.dirs.add(self.cwd_path + "/" + name)

    def storbinary(self, command, stream):
        self.data[self.cwd_path + "/" + command.removeprefix("STOR ")] = stream.read()


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




if __name__ == "__main__":
    unittest.main()

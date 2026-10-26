import io
import json
import tempfile
import unittest
from pathlib import Path

from scripts.deploy_tinet import plan, publish


class FakeFTP:
    def __init__(self):
        self.cwd_path = "/"
        self.data = {"/html/welcome.html": b"old"}
        self.dirs = {"/", "/html"}

    def cwd(self, path):
        dest = (self.cwd_path.rstrip("/") + "/" + path).replace("//", "/") if not path.startswith("/") else path
        while "/./" in dest:
            dest = dest.replace("/./", "/")
        dest = dest.rstrip("/") or "/"
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
            (dist / "deploy-manifest.json").write_text(json.dumps({
                "schema_version": 1,
                "files": {"data/metadata.json": "x", "welcome.html": "y"}
            }))
            ftp = FakeFTP()
            changed = publish(ftp, dist, "html", dist / "backup")
            self.assertEqual(changed, 2)
            self.assertEqual(ftp.data["/html/data/metadata.json"], b"new")
            self.assertEqual(ftp.data["/html/welcome.html"], b"updated")
            self.assertEqual((dist / "backup" / "welcome.html").read_bytes(), b"old")


if __name__ == "__main__":
    unittest.main()

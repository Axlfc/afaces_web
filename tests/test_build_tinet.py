import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts import build_tinet


class BuildTinetTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        for folder in build_tinet.SUFFIXES:
            (self.root / folder).mkdir()
        (self.root / "assets" / "cover.png").write_bytes(b"png")
        (self.root / "css" / "style.css").write_text("body{}")
        (self.root / "js" / "main.js").write_text("console.log('ok')")
        (self.root / "data" / "internal.csv").write_text("not public")
        for page in build_tinet.REQUIRED:
            (self.root / page).write_text('<a href="assets/cover.png">Portada</a>', encoding="utf-8")
        self.catalog = {
            "count": 2,
            "architecture": {"phases": [{"id": 1}, {"id": 2}]},
            "videos": [
                {"ref": "A:1", "coleccion": "album", "numero": 1, "title": "A",
                 "tags": ["Downtempo"], "fase_id": 1,
                 "youtube_url": "https://www.youtube.com/watch?v=12345678901",
                 "tracklist": [{"start_time": 0, "title": "Inicio"}]},
                {"ref": "L:1", "coleccion": "lp", "numero": 1, "title": "LP",
                 "tags": ["LP"], "fase_id": 2,
                 "youtube_url": "https://www.youtube.com/watch?v=ABCDEFGHIJK",
                 "tracklist": []},
            ],
        }
        self.save()
        self.p1 = patch.object(build_tinet, "ROOT", self.root)
        self.p2 = patch.object(build_tinet, "DIST", self.root / "dist")
        self.p1.start()
        self.p2.start()
        self.addCleanup(self.p1.stop)
        self.addCleanup(self.p2.stop)

    def save(self):
        (self.root / "data" / "metadata.json").write_text(json.dumps(self.catalog))

    def test_package_has_only_public_assets(self):
        manifest = build_tinet.build(manifest=True)
        self.assertEqual(len(manifest), len(build_tinet.REQUIRED) + 1 + 4)
        self.assertTrue((self.root / "dist" / "index.html").exists())
        self.assertTrue((self.root / "dist" / "data" / "metadata.json").exists())
        self.assertFalse((self.root / "dist" / "data" / "internal.csv").exists())
        doc = json.loads((self.root / "dist" / "deploy-manifest.json").read_text())
        self.assertEqual(doc["catalog_count"], 2)
        self.assertIn("welcome.html", doc["files"])

    def test_versioned_css_js_urls_prevent_stale_browser_cache(self):
        (self.root / "welcome.html").write_text(
            '<link rel="stylesheet" href="css/style.css">'
            '<script src="js/main.js"></script>'
            '<a href="onboarding.html">Descubrir</a>',
            encoding="utf-8",
        )
        build_tinet.build(manifest=True)
        generated = (self.root / "dist" / "welcome.html").read_text(encoding="utf-8")
        self.assertRegex(generated, r'css/style\.css\?v=[a-f0-9]{12}')
        self.assertRegex(generated, r'js/main\.js\?v=[a-f0-9]{12}')
        self.assertIn('href="onboarding.html"', generated)
        # La versión cambia únicamente cuando cambian los bytes del recurso.
        (self.root / "js" / "main.js").write_text("console.log('changed')")
        build_tinet.build(manifest=True)
        after = (self.root / "dist" / "welcome.html").read_text(encoding="utf-8")
        self.assertNotEqual(generated, after)
        original = (self.root / "welcome.html").read_text(encoding="utf-8")
        self.assertNotIn("?v=", original)

    def test_asset_versioning_preserves_existing_query_and_fragment(self):
        (self.root / "welcome.html").write_text(
            '<script src="js/main.js?lang=es#boot"></script>', encoding="utf-8"
        )
        build_tinet.build(manifest=True)
        generated = (self.root / "dist" / "welcome.html").read_text(encoding="utf-8")
        self.assertRegex(generated, r'js/main\.js\?lang=es&v=[a-f0-9]{12}#boot')

    def test_missing_link_fails(self):
        (self.root / "welcome.html").write_text('<a href="missing.html">No existe</a>')
        with self.assertRaisesRegex(ValueError, "Enlace local inexistente"):
            build_tinet.build()

    def test_path_traversal_fails(self):
        (self.root / "welcome.html").write_text('<a href="../../secret.txt">Peligro</a>')
        with self.assertRaisesRegex(ValueError, "Enlace local inexistente"):
            build_tinet.build()

    def test_duplicate_video_fails(self):
        self.catalog["videos"][1]["youtube_url"] = self.catalog["videos"][0]["youtube_url"]
        self.save()
        with self.assertRaisesRegex(ValueError, "duplicado"):
            build_tinet.build()

    def test_non_monotonic_chapters_fail(self):
        self.catalog["videos"][0]["tracklist"].append({"start_time": 0, "title": "Otra"})
        self.save()
        with self.assertRaisesRegex(ValueError, "capítulos"):
            build_tinet.build()

    def test_missing_phase_fails(self):
        self.catalog["videos"][0]["fase_id"] = None
        self.save()
        with self.assertRaisesRegex(ValueError, "fase"):
            build_tinet.build()

    def test_symlink_fails(self):
        (self.root / "assets" / "escape.png").symlink_to(self.root / "data" / "metadata.json")
        with self.assertRaisesRegex(ValueError, "simbólico"):
            build_tinet.build()


if __name__ == "__main__":
    unittest.main()

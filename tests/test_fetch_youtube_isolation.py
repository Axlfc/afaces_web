import sys
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts import fetch_youtube


class YouTubeIsolationTests(unittest.TestCase):
    def test_catalog_path_is_rejected_before_extraction(self):
        catalog = Path(fetch_youtube.__file__).resolve().parents[1] / "data/metadata.json"
        before = catalog.read_bytes()
        with patch.object(sys, "argv", ["fetch_youtube.py", "--output", str(catalog)]):
            with self.assertRaises(SystemExit) as exc:
                fetch_youtube.main()
        self.assertEqual(exc.exception.code, 2)
        self.assertEqual(catalog.read_bytes(), before)

    def test_default_output_points_to_isolated_snapshot(self):
        source = Path(fetch_youtube.__file__).read_text(encoding="utf-8")
        self.assertIn(".cache/youtube-snapshot.json", source)


if __name__ == "__main__":
    unittest.main()

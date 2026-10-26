import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts import fetch_youtube


class YouTubeIsolationTests(unittest.TestCase):
    def test_extract_script_has_safe_default(self):
        with patch("sys.argv", ["fetch_youtube.py"]):
            # Sin depender de YouTube, la CLI no debe escribir metadata.json
            source = Path(fetch_youtube.__file__).read_text(encoding="utf-8")
            self.assertIn(".cache/youtube-snapshot.json", source)
            self.assertIn("Prohibido sobrescribir data/metadata.json", source)
            self.assertNotIn("default=Path(__file__).resolve().parents[1] / 'data/metadata.json'", source)


if __name__ == "__main__":
    unittest.main()

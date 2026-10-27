"""Integridad del reproductor compartido de AFACES."""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "welcome.html", "onboarding.html", "perfiles.html", "mapa.html",
    "timeline.html", "lanzamiento.html", "recomendaciones.html",
    "feedback.html", "letras.html", "accesibilidad.html",
)
CONTROLS = (
    "radioToggle", "radioPanel", "radioBackdrop", "radioClose", "rPlay",
    "rPrev", "rNext", "rShuffle", "radioVol", "radioSeek",
    "radioProgressFill", "radioCurrTime", "radioDuration", "radioTrackName",
    "radioTrackArtist", "radioTrackCount", "radioArtImg", "radioVinyl",
    "rpDot", "radioLiveDot", "radioPlaylist",
)


class RadioContract(unittest.TestCase):
    def test_every_page_has_full_radio_and_its_scripts_in_order(self):
        for page in PAGES:
            with self.subTest(page=page):
                html = (ROOT / page).read_text(encoding="utf-8")
                for key in CONTROLS:
                    self.assertEqual(html.count('id="' + key + '"'), 1, f"{page}: {key}")
                for script in ("radio-data.js", "radio-player.js"):
                    self.assertEqual(
                        html.count('src="js/' + script + '"'), 1, f"{page}: {script}"
                    )
                self.assertLess(html.index('src="js/radio-data.js"'),
                                html.index('src="js/radio-player.js"'))

    def test_no_duplicate_radio_engine_or_placeholder(self):
        home = (ROOT / "js/main.js").read_text(encoding="utf-8")
        shell = (ROOT / "js/discovery-shell.js").read_text(encoding="utf-8")
        data = (ROOT / "js/radio-data.js").read_text(encoding="utf-8")
        self.assertNotIn("const RADIO_TRACKS =", home)
        self.assertNotIn("const RADIO_TRACKS =", shell)
        self.assertNotIn("Para escuchar la radio completa", shell)
        self.assertNotIn("location.href='welcome.html#hero'", shell)
        self.assertEqual(data.count("const RADIO_TRACKS = ["), 1)
        self.assertGreaterEqual(data.count("path: BASE +"), 100)

    def test_downloads_are_actions_not_ellipsis_icons(self):
        player = (ROOT / "js/radio-player.js").read_text(encoding="utf-8")
        css = (ROOT / "css/styles.css").read_text(encoding="utf-8")
        self.assertIn('class="rpl-download"', player)
        self.assertIn('aria-label="Descargar MP3 (descargar ', player)
        self.assertIn('title="Descargar MP3 (descargar ', player)
        self.assertIn('href="'+ "'+escapeHtml(track.path)+'"+'"', player)
        self.assertIn('m7 10 5 5 5-5', player)
        self.assertNotIn('<circle cx="12" cy="5" r="1"', player)
        self.assertIn(".rpl-download:focus-visible", css)

    def test_resume_is_user_initiated_and_missing_files_report_errors(self):
        player = (ROOT / "js/radio-player.js").read_text(encoding="utf-8")
        self.assertIn("sessionStorage", player)
        self.assertIn("loadTrack(state.index,false)", player)
        self.assertIn("audio.addEventListener('error'", player)
        self.assertIn('target="_blank" rel="noopener noreferrer"', player)
        self.assertNotIn("fetch(track.path)", player)
        self.assertNotIn("downloadTrack(", player)
        self.assertNotIn("URL.createObjectURL(", player)


if __name__ == "__main__":
    unittest.main()

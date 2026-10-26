"""Contrato común de navegación en todas las páginas del sitio."""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "welcome.html", "onboarding.html", "perfiles.html", "mapa.html",
    "timeline.html", "lanzamiento.html", "recomendaciones.html",
    "feedback.html", "letras.html", "accesibilidad.html",
)


class NavigationContractTests(unittest.TestCase):
    def test_each_public_page_loads_unique_navigation_script(self):
        for page in PAGES:
            with self.subTest(page=page):
                content = (ROOT / page).read_text(encoding="utf-8")
                self.assertEqual(
                    len(re.findall(r'<script\\s+src=["\\']js/mobile-nav\\.js["\\']', content)),
                    1,
                    f"{page} debe cargar exactamente una vez mobile-nav.js"
                )
                self.assertRegex(content, r'<nav\\b')
                self.assertIn('class="nav-links"', content)

    def test_mobile_navigation_targets_are_public(self):
        script = (ROOT / "js/mobile-nav.js").read_text(encoding="utf-8")
        for dest in re.findall(r"\\['[^']+','([^']+\\.html)(?:#[^']*)?',(?:true|false)\\]", script):
            with self.subTest(target=dest):
                self.assertTrue((ROOT / dest).is_file(), dest)

    def test_hidden_menu_can_not_override_closed_state(self):
        styles = (ROOT / "css/styles.css").read_text(encoding="utf-8")
        self.assertIn("body>nav .nav-links[hidden]", styles)
        self.assertIn("display:none!important", styles)
        self.assertIn("body>nav .nav-links:not([hidden])", styles)


if __name__ == "__main__":
    unittest.main()

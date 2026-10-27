"""Pruebas del migrador no destructivo de licencias para la web histórica."""
import importlib.util
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "apply_legacy_licenses.py"
SPEC = importlib.util.spec_from_file_location("legacy_licenses", SCRIPT)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)


class LegacyLicensesTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name)
        self.repo.joinpath("README.md").write_text(
            "Web\n\n## 🖋 Autor\nLibre para que cualquiera lo use, lo modifique y lo propague.\n",
            encoding="utf-8",
        )
        self.repo.joinpath("epk.md").write_text(
            "> Aviso de EPK histórico\n\n## Afaces Electronic Press Kit\n\nMúsica.\n",
            encoding="utf-8",
        )
        self.repo.joinpath("CONTRIBUTING.md").write_text(
            "# Contribuciones\n\nGracias.\n", encoding="utf-8"
        )

    def test_five_files_preserving_existing_site(self):
        files = module.prepare(self.repo, (ROOT / "LICENSE").read_text(encoding="utf-8"))
        self.assertEqual(
            set(files), {"LICENSE", "LICENCIAS.md", "README.md", "epk.md", "CONTRIBUTING.md"}
        )
        self.assertTrue(files["LICENSE"].startswith("MIT License"))
        self.assertIn("CC BY-SA 4.0", files["LICENCIAS.md"])
        self.assertIn("derechos reservados", files["LICENCIAS.md"])
        self.assertIn("EPK histórico", files["epk.md"])
        self.assertLess(
            files["epk.md"].index("Código abierto para otras webs musicales"),
            files["epk.md"].index("Afaces Electronic Press Kit"),
        )
        self.assertEqual(self.repo.joinpath("README.md").read_text(encoding="utf-8").splitlines()[0], "Web")

    def test_idempotent_and_no_replacement_of_existing_license(self):
        files = module.prepare(self.repo, (ROOT / "LICENSE").read_text(encoding="utf-8"))
        for name, contents in files.items():
            self.repo.joinpath(name).write_text(contents, encoding="utf-8")
        again = module.prepare(self.repo, (ROOT / "LICENSE").read_text(encoding="utf-8"))
        self.assertEqual(files, again)
        self.repo.joinpath("LICENSE").write_text("Licencia existente", encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "LICENSE ya existe"):
            module.prepare(self.repo, (ROOT / "LICENSE").read_text(encoding="utf-8"))

    def test_missing_legacy_structure_is_rejected(self):
        self.repo.joinpath("epk.md").unlink()
        with self.assertRaisesRegex(ValueError, "falta epk.md"):
            module.prepare(self.repo, (ROOT / "LICENSE").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()

import csv
import os
import tempfile
import unittest
from history import add_to_history, clear_history
from csv_export import export_history


class TestCsvExport(unittest.TestCase):

    # Reset history
    def setUp(self):
        clear_history()
        self.path = os.path.join(tempfile.mkdtemp(), "history.csv")

    # Empty history
    def test_empty_history(self):
        self.assertIn("No lookups", export_history(self.path))
        self.assertFalse(os.path.exists(self.path))

    # Export lookups
    def test_export(self):
        add_to_history({"ip": "8.8.8.8", "city": "Mountain View", "org": "Google LLC"})
        add_to_history({"ip": "1.1.1.1", "org": "Cloudflare, Inc."})
        self.assertEqual(export_history(self.path), "")
        with open(self.path, newline="", encoding="utf-8") as csv_file:
            rows = list(csv.DictReader(csv_file))
        self.assertEqual(len(rows), 2)
        self.assertEqual(rows[0]["IP Address"], "8.8.8.8")
        self.assertEqual(rows[0]["City"], "Mountain View")
        self.assertEqual(rows[1]["ISP"], "Cloudflare, Inc.")


if __name__ == "__main__":
    unittest.main()

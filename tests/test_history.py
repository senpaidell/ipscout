import unittest
from history import history, add_to_history, build_history_rows, clear_history
from display import build_ip_details


class TestHistory(unittest.TestCase):

    # Reset history
    def setUp(self):
        clear_history()

    # Add lookups
    def test_add_to_history(self):
        add_to_history({"ip": "8.8.8.8", "city": "Mountain View", "country_name": "United States"})
        add_to_history({"ip": "1.1.1.1"})
        self.assertEqual(len(history), 2)
        rows = build_history_rows()
        self.assertEqual(rows["#1"], "8.8.8.8  (Mountain View, United States)")
        self.assertEqual(rows["#2"], "1.1.1.1  (N/A, N/A)")

    # Empty history
    def test_empty_history(self):
        self.assertEqual(build_history_rows(), {})

    # Detail fields
    def test_build_ip_details(self):
        details = build_ip_details({"ip": "8.8.8.8", "country_name": "United States", "country_code": "US"})
        self.assertEqual(details["IP Address"], "8.8.8.8")
        self.assertEqual(details["Country"], "United States (US)")
        self.assertEqual(details["City"], "N/A")


if __name__ == "__main__":
    unittest.main()

import socket
import unittest
from unittest.mock import patch
from domain_lookup import is_valid_domain, fetch_domain_ip


class TestDomainLookup(unittest.TestCase):

    # Valid domains
    def test_valid_domains(self):
        self.assertTrue(is_valid_domain("google.com"))
        self.assertTrue(is_valid_domain("www.my-site.org"))

    # Invalid domains
    def test_invalid_domains(self):
        self.assertFalse(is_valid_domain("google"))
        self.assertFalse(is_valid_domain("bad..com"))
        self.assertFalse(is_valid_domain("-bad.com"))
        self.assertFalse(is_valid_domain("8.8.8.8"))

    # Resolve domain
    @patch("domain_lookup.socket.gethostbyname", return_value="142.250.70.46")
    def test_resolve(self, mock_resolve):
        ip, error = fetch_domain_ip("google.com")
        self.assertEqual(ip, "142.250.70.46")
        self.assertEqual(error, "")

    # Unknown domain
    @patch("domain_lookup.socket.gethostbyname", side_effect=socket.gaierror)
    def test_unknown_domain(self, mock_resolve):
        ip, error = fetch_domain_ip("no-such-site.example")
        self.assertIsNone(ip)
        self.assertIn("Could not find", error)


if __name__ == "__main__":
    unittest.main()

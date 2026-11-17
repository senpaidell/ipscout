import unittest
from ip_checker import is_valid_ip, check_ip_type, build_ip_type_details


class TestIpChecker(unittest.TestCase):

    # Valid IPs
    def test_valid_ips(self):
        self.assertTrue(is_valid_ip("8.8.8.8"))
        self.assertTrue(is_valid_ip("2001:4860:4860::8888"))

    # Invalid IPs
    def test_invalid_ips(self):
        self.assertFalse(is_valid_ip("abc"))
        self.assertFalse(is_valid_ip("256.1.1.1"))
        self.assertFalse(is_valid_ip(""))

    # IP types
    def test_ip_types(self):
        self.assertEqual(check_ip_type("8.8.8.8"), "Public")
        self.assertEqual(check_ip_type("192.168.1.1"), "Private")
        self.assertEqual(check_ip_type("127.0.0.1"), "Loopback")
        self.assertEqual(check_ip_type("224.0.0.1"), "Multicast")

    # Offline details
    def test_offline_details(self):
        details = build_ip_type_details("10.0.0.1")
        self.assertEqual(details["Version"], "IPv4")
        self.assertEqual(details["Type"], "Private")


if __name__ == "__main__":
    unittest.main()

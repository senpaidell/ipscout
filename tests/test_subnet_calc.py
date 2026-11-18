import unittest
from subnet_calc import is_valid_subnet, build_subnet_details


class TestSubnetCalc(unittest.TestCase):

    # Valid subnets
    def test_valid_subnets(self):
        self.assertTrue(is_valid_subnet("192.168.1.0/24"))
        self.assertTrue(is_valid_subnet("192.168.1.77/26"))
        self.assertTrue(is_valid_subnet("2001:db8::/64"))

    # Invalid subnets
    def test_invalid_subnets(self):
        self.assertFalse(is_valid_subnet("192.168.1.0"))
        self.assertFalse(is_valid_subnet("192.168.1.0/33"))
        self.assertFalse(is_valid_subnet("abc/24"))

    # IPv4 /24
    def test_ipv4_subnet(self):
        details = build_subnet_details("192.168.1.77/24")
        self.assertEqual(details["Network"], "192.168.1.0/24")
        self.assertEqual(details["Netmask"], "255.255.255.0")
        self.assertEqual(details["Wildcard"], "0.0.0.255")
        self.assertEqual(details["Broadcast"], "192.168.1.255")
        self.assertEqual(details["First Host"], "192.168.1.1")
        self.assertEqual(details["Last Host"], "192.168.1.254")
        self.assertEqual(details["Usable Hosts"], "254")

    # Small subnets
    def test_small_subnets(self):
        self.assertEqual(build_subnet_details("10.0.0.0/30")["Usable Hosts"], "2")
        self.assertEqual(build_subnet_details("10.0.0.5/32")["Usable Hosts"], "1")

    # IPv6 subnet
    def test_ipv6_subnet(self):
        details = build_subnet_details("2001:db8::/126")
        self.assertEqual(details["Broadcast"], "None (IPv6)")
        self.assertEqual(details["Total Addresses"], "4")


if __name__ == "__main__":
    unittest.main()

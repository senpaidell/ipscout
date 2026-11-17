import unittest
from unittest.mock import patch, Mock
import requests
from ip_api import fetch_ip_info


# Fake reply
def build_reply(status_code, json_data):
    reply = Mock()
    reply.status_code = status_code
    reply.json.return_value = json_data
    return reply


class TestIpApi(unittest.TestCase):

    # Successful lookup
    @patch("ip_api.requests.get")
    def test_success(self, mock_get):
        mock_get.return_value = build_reply(200, {"ip": "8.8.8.8", "city": "Mountain View"})
        json_data, error = fetch_ip_info("8.8.8.8")
        self.assertEqual(error, "")
        self.assertEqual(json_data["city"], "Mountain View")
        self.assertIn("8.8.8.8/json/", mock_get.call_args[0][0])

    # Rate limit
    @patch("ip_api.requests.get")
    def test_rate_limit(self, mock_get):
        mock_get.return_value = build_reply(429, {})
        json_data, error = fetch_ip_info("8.8.8.8")
        self.assertIsNone(json_data)
        self.assertIn("limit", error)

    # API error field
    @patch("ip_api.requests.get")
    def test_api_error(self, mock_get):
        mock_get.return_value = build_reply(200, {"error": True, "reason": "Reserved IP Address"})
        json_data, error = fetch_ip_info("10.0.0.1")
        self.assertIn("Reserved IP Address", error)

    # No internet
    @patch("ip_api.requests.get", side_effect=requests.exceptions.ConnectionError)
    def test_no_internet(self, mock_get):
        json_data, error = fetch_ip_info()
        self.assertIn("No internet", error)


if __name__ == "__main__":
    unittest.main()

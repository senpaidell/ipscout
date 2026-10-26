import requests

base_url = "https://ipapi.co/"
headers = {"User-Agent": "IPScout/1.0"}


# Fetch IP details from ipapi.co (blank ip = this computer)
def fetch_ip_info(ip=""):
    if ip == "":
        url = base_url + "json/"
    else:
        url = base_url + ip + "/json/"

    try:
        reply = requests.get(url, headers=headers, timeout=10)
    except requests.exceptions.ConnectionError:
        return None, "No internet connection. Check your network and try again."
    except requests.exceptions.Timeout:
        return None, "The request timed out. Try again in a moment."
    except requests.exceptions.RequestException:
        return None, "Something went wrong while contacting the API."

    if reply.status_code == 429:
        return None, "Daily API limit reached. Try again later."
    if reply.status_code != 200:
        return None, "API error (status code " + str(reply.status_code) + ")."

    try:
        json_data = reply.json()
    except ValueError:
        return None, "The API sent back data that could not be read."

    if json_data.get("error"):
        return None, "API could not look up this IP: " + str(json_data.get("reason"))
    return json_data, ""


# Fetch details for this computer's public IP
def fetch_my_ip_info():
    return fetch_ip_info("")

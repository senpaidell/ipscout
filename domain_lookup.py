import socket
from ip_checker import is_valid_ip


# Domain check
def is_valid_domain(text):
    parts = text.split(".")
    if len(parts) < 2 or is_valid_ip(text):
        return False
    for part in parts:
        if part == "" or len(part) > 63:
            return False
        if part.startswith("-") or part.endswith("-"):
            return False
        if not part.replace("-", "").isalnum():
            return False
    return True


# Fetch domain IP
def fetch_domain_ip(domain):
    if not is_valid_domain(domain):
        return None, "'" + domain + "' is not a valid domain name."
    try:
        ip = socket.gethostbyname(domain)
    except socket.gaierror:
        return None, "Could not find an IP address for " + domain + "."
    return ip, ""

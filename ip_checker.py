import ipaddress


# Check if text is a valid IPv4 or IPv6 address
def is_valid_ip(text):
    try:
        ipaddress.ip_address(text)
        return True
    except ValueError:
        return False


# Find the type of an IP address (public, private, loopback, etc.)
def check_ip_type(text):
    ip = ipaddress.ip_address(text)
    if ip.is_loopback:
        return "Loopback"
    elif ip.is_link_local:
        return "Link-local"
    elif ip.is_multicast:
        return "Multicast"
    elif ip.is_unspecified:
        return "Unspecified"
    elif ip.is_private:
        return "Private"
    elif ip.is_global:
        return "Public"
    else:
        return "Reserved"

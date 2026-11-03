import ipaddress


# IP check
def is_valid_ip(text):
    try:
        ipaddress.ip_address(text)
        return True
    except ValueError:
        return False


# IP type
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


# Offline details
def build_ip_type_details(text):
    ip = ipaddress.ip_address(text)
    return {
        "IP Address": str(ip),
        "Version": "IPv" + str(ip.version),
        "Type": check_ip_type(text),
    }

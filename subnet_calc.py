import ipaddress


# Usable host range
def build_host_range(network):
    if network.num_addresses <= 2:
        return network[0], network[-1], network.num_addresses
    if network.version == 6:
        return network[0], network[-1], network.num_addresses
    return network[1], network[-2], network.num_addresses - 2


# Subnet details
def build_subnet_details(text):
    network = ipaddress.ip_network(text, strict=False)
    first, last, usable = build_host_range(network)
    broadcast = str(network.broadcast_address) if network.version == 4 else "None (IPv6)"
    return {
        "Network": str(network),
        "Version": "IPv" + str(network.version),
        "Netmask": str(network.netmask),
        "Wildcard": str(network.hostmask),
        "Broadcast": broadcast,
        "First Host": str(first),
        "Last Host": str(last),
        "Usable Hosts": "{:,}".format(usable),
        "Total Addresses": "{:,}".format(network.num_addresses),
    }


# Check subnet
def is_valid_subnet(text):
    if "/" not in text:
        return False
    try:
        ipaddress.ip_network(text, strict=False)
        return True
    except ValueError:
        return False

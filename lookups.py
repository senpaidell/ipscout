from ip_api import fetch_ip_info, fetch_my_ip_info
from ip_checker import is_valid_ip, check_ip_type
from domain_lookup import fetch_domain_ip
from display import print_details, print_error, build_ip_details
from history import add_to_history


# Show results
def print_lookup(title, json_data, error):
    if error:
        print_error(error)
        return
    add_to_history(json_data)
    print_details(title, build_ip_details(json_data))


# My IP
def show_my_ip():
    json_data, error = fetch_my_ip_info()
    print_lookup("Your Public IP", json_data, error)


# IP lookup
def look_up_ip():
    ip = input("Enter an IP address: ").strip()
    if not is_valid_ip(ip):
        print_error("'" + ip + "' is not a valid IPv4 or IPv6 address.")
        return
    ip_type = check_ip_type(ip)
    if ip_type != "Public":
        print_error(ip + " is a " + ip_type.lower() + " address. Try option 3 instead.")
        return
    json_data, error = fetch_ip_info(ip)
    print_lookup("IP Lookup: " + ip, json_data, error)


# Domain lookup
def look_up_domain():
    domain = input("Enter a domain name (e.g. google.com): ").strip().lower()
    ip, error = fetch_domain_ip(domain)
    if error:
        print_error(error)
        return
    json_data, error = fetch_ip_info(ip)
    print_lookup("Domain Lookup: " + domain, json_data, error)

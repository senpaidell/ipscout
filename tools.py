import os
from ip_checker import is_valid_ip, build_ip_type_details
from subnet_calc import is_valid_subnet, build_subnet_details
from csv_export import export_history, file_name
from display import print_details, print_error, print_success


# Offline check
def check_ip_offline():
    ip = input("Enter an IP address: ").strip()
    if not is_valid_ip(ip):
        print_error("'" + ip + "' is not a valid IPv4 or IPv6 address.")
        return
    print_details("Offline Check: " + ip, build_ip_type_details(ip))


# Subnet calculator
def calculate_subnet():
    text = input("Enter a subnet in CIDR form (e.g. 192.168.1.0/24): ").strip()
    if not is_valid_subnet(text):
        print_error("'" + text + "' is not a valid subnet. Use a form like 192.168.1.0/24.")
        return
    print_details("Subnet: " + text, build_subnet_details(text))


# Export to CSV
def export_history_csv():
    error = export_history()
    if error:
        print_error(error)
        return
    print_success("History saved to " + os.path.abspath(file_name))

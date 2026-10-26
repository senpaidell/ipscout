import os
from ip_api import fetch_ip_info, fetch_my_ip_info
from ip_checker import is_valid_ip, check_ip_type
from display import print_banner, print_menu, print_details, print_error, build_ip_details


# Show details for this computer's public IP
def show_my_ip():
    json_data, error = fetch_my_ip_info()
    if error:
        print_error(error)
        return
    print_details("Your Public IP", build_ip_details(json_data))


# Look up details for an IP typed by the user
def look_up_ip():
    ip = input("Enter an IP address: ").strip()
    if not is_valid_ip(ip):
        print_error("'" + ip + "' is not a valid IPv4 or IPv6 address.")
        return
    ip_type = check_ip_type(ip)
    if ip_type != "Public":
        print_error(ip + " is a " + ip_type.lower() + " address. Only public IPs can be looked up.")
        return

    json_data, error = fetch_ip_info(ip)
    if error:
        print_error(error)
        return
    print_details("IP Lookup: " + ip, build_ip_details(json_data))


# Run the main menu loop
def run_app():
    os.system("")
    print_banner()
    while True:
        print_menu()
        choice = input("\nChoose an option: ").strip().lower()
        if choice == "q" or choice == "quit":
            print("Goodbye!")
            break
        elif choice == "1":
            show_my_ip()
        elif choice == "2":
            look_up_ip()
        else:
            print_error("Invalid option. Enter 1, 2, or q.")


if __name__ == "__main__":
    try:
        run_app()
    except (KeyboardInterrupt, EOFError):
        print("\nGoodbye!")

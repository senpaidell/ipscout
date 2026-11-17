import os
from ip_checker import is_valid_ip, build_ip_type_details
from display import print_banner, print_menu, print_details, print_error
from lookups import show_my_ip, look_up_ip, look_up_domain
from history import show_history


# Offline check
def check_ip_offline():
    ip = input("Enter an IP address: ").strip()
    if not is_valid_ip(ip):
        print_error("'" + ip + "' is not a valid IPv4 or IPv6 address.")
        return
    print_details("Offline Check: " + ip, build_ip_type_details(ip))


# Main loop
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
        elif choice == "3":
            check_ip_offline()
        elif choice == "4":
            look_up_domain()
        elif choice == "5":
            show_history()
        else:
            print_error("Invalid option. Enter 1, 2, 3, 4, 5, or q.")


if __name__ == "__main__":
    try:
        run_app()
    except (KeyboardInterrupt, EOFError):
        print("\nGoodbye!")

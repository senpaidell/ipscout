import os
from display import print_error
from menu import print_banner, print_menu
from lookups import show_my_ip, look_up_ip, look_up_domain
from tools import check_ip_offline, calculate_subnet, export_history_csv
from history import show_history


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
        elif choice == "6":
            export_history_csv()
        elif choice == "7":
            calculate_subnet()
        else:
            print_error("Invalid option. Enter a number from 1 to 7, or q.")


if __name__ == "__main__":
    try:
        run_app()
    except (KeyboardInterrupt, EOFError):
        print("\nGoodbye!")

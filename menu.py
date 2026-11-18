from colors import RESET, BOLD, YELLOW, CYAN, GREY
from display import line


# Banner
def print_banner():
    print(CYAN + line)
    print(BOLD + "  IPScout" + RESET + GREY + "  v1.0 prototype" + RESET)
    print("  Public IP lookup for network technicians")
    print(CYAN + line + RESET)


# Menu
def print_menu():
    print("\n" + YELLOW + "1" + RESET + "  Show my public IP info")
    print(YELLOW + "2" + RESET + "  Look up an IP address")
    print(YELLOW + "3" + RESET + "  Check an IP offline")
    print(YELLOW + "4" + RESET + "  Look up a domain name")
    print(YELLOW + "5" + RESET + "  Show lookup history")
    print(YELLOW + "6" + RESET + "  Export history to CSV")
    print(YELLOW + "7" + RESET + "  Subnet calculator")
    print(YELLOW + "q" + RESET + "  Quit")

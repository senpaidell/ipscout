from colors import RESET, BOLD, RED, GREEN, YELLOW, CYAN, GREY

line = "+" * 50


# Print the app title banner
def print_banner():
    print(CYAN + line)
    print(BOLD + "  IPScout" + RESET + GREY + "  v1.0 prototype" + RESET)
    print("  Public IP lookup for network technicians")
    print(CYAN + line + RESET)


# Print the main menu options
def print_menu():
    print("\n" + YELLOW + "1" + RESET + "  Show my public IP info")
    print(YELLOW + "2" + RESET + "  Look up an IP address")
    print(YELLOW + "3" + RESET + "  Check an IP offline")
    print(YELLOW + "q" + RESET + "  Quit")


# Print labeled details in aligned rows
def print_details(title, details):
    print("\n" + CYAN + line + RESET)
    print(BOLD + GREEN + "  " + title + RESET)
    print(CYAN + line + RESET)
    for label, value in details.items():
        print("  " + GREY + label.ljust(15) + RESET + str(value))
    print(CYAN + line + RESET)


# Print an error message in red
def print_error(message):
    print("\n" + RED + "Error: " + message + RESET)


# Pick the useful fields from the API data
def build_ip_details(json_data):
    def get(key):
        return json_data.get(key) or "N/A"

    return {
        "IP Address": get("ip"),
        "Version": get("version"),
        "ISP": get("org"),
        "ASN": get("asn"),
        "City": get("city"),
        "Region": get("region"),
        "Country": str(get("country_name")) + " (" + str(get("country_code")) + ")",
        "Postal Code": get("postal"),
        "Timezone": str(get("timezone")) + " (UTC " + str(get("utc_offset")) + ")",
        "Coordinates": str(get("latitude")) + ", " + str(get("longitude")),
    }

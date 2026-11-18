from colors import RESET, BOLD, RED, GREEN, CYAN, GREY

line = "+" * 50


# Details table
def print_details(title, details):
    print("\n" + CYAN + line + RESET)
    print(BOLD + GREEN + "  " + title + RESET)
    print(CYAN + line + RESET)
    for label, value in details.items():
        print("  " + GREY + label.ljust(17) + RESET + str(value))
    print(CYAN + line + RESET)


# Success message
def print_success(message):
    print("\n" + GREEN + message + RESET)


# Error message
def print_error(message):
    print("\n" + RED + "Error: " + message + RESET)


# Detail fields
def build_ip_details(json_data):
    def get(key):
        return json_data.get(key) or "N/A"

    return {
        "IP Address": get("ip"),
        "Version": get("version"),
        "ISP": get("org"),
        "ASN": get("asn"),
        "Network": get("network"),
        "City": get("city"),
        "Region": get("region"),
        "Country": str(get("country_name")) + " (" + str(get("country_code")) + ")",
        "Postal Code": get("postal"),
        "Timezone": str(get("timezone")) + " (UTC " + str(get("utc_offset")) + ")",
        "Coordinates": str(get("latitude")) + ", " + str(get("longitude")),
    }

from display import print_details, print_error

history = []


# Add to history
def add_to_history(json_data):
    place = str(json_data.get("city") or "N/A") + ", " + str(json_data.get("country_name") or "N/A")
    history.append({"ip": json_data.get("ip") or "N/A", "place": place})


# History rows
def build_history_rows():
    rows = {}
    for number, item in enumerate(history, start=1):
        rows["#" + str(number)] = item["ip"] + "  (" + item["place"] + ")"
    return rows


# Show history
def show_history():
    if len(history) == 0:
        print_error("No lookups yet. Try option 1, 2 or 4 first.")
        return
    print_details("Lookup History", build_history_rows())


# Clear history
def clear_history():
    history.clear()

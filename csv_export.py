import csv
from history import history

file_name = "ipscout_history.csv"


# CSV rows
def build_csv_rows(entries):
    return [entry["details"] for entry in entries]


# Write CSV
def write_csv(entries, path):
    rows = build_csv_rows(entries)
    try:
        with open(path, "w", newline="", encoding="utf-8") as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=list(rows[0].keys()))
            writer.writeheader()
            writer.writerows(rows)
    except OSError:
        return "Could not save " + path + ". Close it if it is open in Excel and try again."
    return ""


# Export history
def export_history(path=file_name):
    if len(history) == 0:
        return "No lookups to export yet. Try option 1, 2 or 4 first."
    return write_csv(history, path)

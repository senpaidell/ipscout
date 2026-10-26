# IPScout

**v1.0 prototype.** A Python terminal app that shows public IP addressing information for network technicians. Built for DEVASC Project Activity 3 (Option 2) using the free [ipapi.co](https://ipapi.co) REST API.

## Features
| Option | What it does |
|---|---|
| 1 | Shows this computer's public IP: version, ISP, ASN, city, region, country, postal code, timezone, coordinates |
| 2 | Looks up the same details for any public IPv4 or IPv6 address |
| q | Quits the app |

## How to run
Requires Python 3.8 or newer. On Windows use `py`; on Mac/Linux (including the DEVASC VM) use `python3`.

| Step | Windows | Mac / Linux |
|---|---|---|
| Install dependencies | `py -m pip install -r requirements.txt` | `python3 -m pip install -r requirements.txt` |
| Run the app | `py main.py` | `python3 main.py` |

No API key is needed. The free ipapi.co plan allows about 1,000 requests per day.

## Project structure
| File | Purpose |
|---|---|
| `main.py` | Entry point. Runs the menu loop and handles each option. |
| `ip_api.py` | Calls ipapi.co and turns network/API problems into error messages. |
| `ip_checker.py` | Checks that an IP is valid and public before looking it up, using Python's `ipaddress` module. |
| `display.py` | All terminal output: banner, menu, detail tables, errors. |
| `colors.py` | ANSI color codes used by `display.py`. |

## How it works
1. `main.py` shows the menu and reads the user's choice.
2. For option 2, `ip_checker.py` first makes sure the IP is valid and public.
3. `ip_api.fetch_ip_info()` sends a GET request to `https://ipapi.co/json/` (your IP) or `https://ipapi.co/<ip>/json/` (another IP).
4. It returns a pair: `(json_data, error)`. If `error` is not empty, `display.print_error()` shows it.
5. Otherwise `display.build_ip_details()` picks the useful fields and `display.print_details()` prints them as aligned rows.

## Error handling
| Problem | What the user sees |
|---|---|
| No internet / DNS failure | "No internet connection..." |
| Request takes over 10 seconds | "The request timed out..." |
| Free daily limit reached (HTTP 429) | "Daily API limit reached..." |
| Invalid IP typed | "'abc' is not a valid IPv4 or IPv6 address." |
| Private or reserved IP in option 2 | "192.168.1.1 is a private address. Only public IPs can be looked up." |
| Ctrl+C | Exits with "Goodbye!" |

## Known limitation
ipapi.co returns the address your connection uses to reach it: IPv6 if your network supports it, otherwise IPv4. It cannot return both in one request. The "Version" row shows which one you got.

## How to extend
- **New field from the API:** add a row in `build_ip_details()` in `display.py`. See the [ipapi.co docs](https://ipapi.co/api/) for available fields.
- **New menu option:** add a line to `print_menu()` in `display.py`, write a new verb-named function in `main.py`, and add an `elif` in `run_app()`.
- **Code rules:** keep files around 50 lines, give each function one title comment, start function names with a verb (`fetch_`, `print_`, `check_`, `build_`), and show a red error message instead of crashing.
- **Future ideas:** see `BACKLOG.md`.

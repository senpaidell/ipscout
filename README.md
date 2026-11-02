# IPScout

**v1.0 prototype.** A Python terminal app and a React web app that show public IP addressing information for network technicians. Built for DEVASC Project Activity 3 (Option 2) using the free [ipapi.co](https://ipapi.co) REST API.

## Terminal app features
| Option | What it does |
|---|---|
| 1 | Shows this computer's public IP: version, ISP, ASN, city, region, country, postal code, timezone, coordinates |
| 2 | Looks up the same details for any public IPv4 or IPv6 address |
| q | Quits the app |

## How to run the terminal app
Requires Python 3.8 or newer. On Windows use `py`; on Mac/Linux (including the DEVASC VM) use `python3`.

| Step | Windows | Mac / Linux |
|---|---|---|
| Install dependencies | `py -m pip install -r requirements.txt` | `python3 -m pip install -r requirements.txt` |
| Run the app | `py main.py` | `python3 main.py` |

No API key is needed. The free ipapi.co plan allows about 1,000 requests per day.

## React frontend
The `frontend` folder has a web version built with React and Vite. It calls ipapi.co directly from the browser, so it doesn't need the Python app running.

### Features
| Page | What it does |
|---|---|
| Home | Press **Go** to see this computer's public IP details, then **Again** to refresh them |
| Look Up | Type a public IPv4 or IPv6 address, or click a sample IP, to see its details. **Again** repeats the lookup |

- Skeleton placeholders show while the page and results load, and the **Look up** button shows a spinner.
- Invalid and non-public addresses are caught before any API request is sent.
- The background has moving polka dots and a gradient that breathes up from the footer. Both stop for users with reduced motion turned on.

### How to run
Requires Node.js 18 or newer.

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints, usually `http://localhost:5173`.

### Frontend structure
| Path in `frontend` | Purpose |
|---|---|
| `index.html` | Page shell, including the first-load skeleton and background |
| `public/logo.svg` | IPScout logo and browser tab icon |
| `src/App.jsx` | Header, active page and footer |
| `src/api/` | `ipApi.js` calls ipapi.co; `useIpRequest.js` tracks data, error and loading state |
| `src/utils/` | `ipChecker.js` validates IPs; `ipDetails.js` picks the fields to display |
| `src/views/` | `MyIpView.jsx` (Home) and `LookUpView.jsx` (Look Up) |
| `src/components/` | Header, footer, cards, results, skeleton, sample IPs and back-to-top button |
| `src/styles/` | `tokens.css` holds all design values; the other files hold layout, component, background and skeleton styles |

## Terminal app structure
| File | Purpose |
|---|---|
| `main.py` | Entry point. Runs the menu loop and handles each option. |
| `ip_api.py` | Calls ipapi.co and turns network/API problems into error messages. |
| `ip_checker.py` | Checks that an IP is valid and public before looking it up, using Python's `ipaddress` module. |
| `display.py` | All terminal output: banner, menu, detail tables, errors. |
| `colors.py` | ANSI color codes used by `display.py`. |

## How the terminal app works
1. `main.py` shows the menu and reads the user's choice.
2. For option 2, `ip_checker.py` first makes sure the IP is valid and public.
3. `ip_api.fetch_ip_info()` sends a GET request to `https://ipapi.co/json/` (your IP) or `https://ipapi.co/<ip>/json/` (another IP).
4. It returns a pair: `(json_data, error)`. If `error` is not empty, `display.print_error()` shows it.
5. Otherwise `display.build_ip_details()` picks the useful fields and `display.print_details()` prints them as aligned rows.

## Terminal app error handling
| Problem | What the user sees |
|---|---|
| No internet / DNS failure | "No internet connection..." |
| Request takes over 10 seconds | "The request timed out..." |
| Free daily limit reached (HTTP 429) | "Daily API limit reached..." |
| Invalid IP typed | "'abc' is not a valid IPv4 or IPv6 address." |
| Private or reserved IP in option 2 | "192.168.1.1 is a private address. Only public IPs can be looked up." |
| Ctrl+C | Exits with "Goodbye!" |

## Known limitation
ipapi.co returns the address your connection uses to reach it: IPv6 if your network supports it, otherwise IPv4. It cannot return both in one request. The version shown in the results tells you which one you got.

## How to extend
- **New field from the API:** add a row in `build_ip_details()` in `display.py`. See the [ipapi.co docs](https://ipapi.co/api/) for available fields.
- **New menu option:** add a line to `print_menu()` in `display.py`, write a new verb-named function in `main.py`, and add an `elif` in `run_app()`.
- **New field in the web app:** add a row in `buildIpDetails()` in `frontend/src/utils/ipDetails.js`.
- **New sample IP:** add it to `SAMPLE_IPS` in `frontend/src/components/SampleIps.jsx`.
- **Colors and sizes in the web app:** change the values in `frontend/src/styles/tokens.css`. The logo's colors are set separately in `frontend/public/logo.svg`.
- **Code rules:** keep files around 50 lines, give each function one title comment, start function names with a verb (`fetch_`, `print_`, `check_`, `build_`), and show a red error message instead of crashing.
- **Future ideas:** see `BACKLOG.md`.

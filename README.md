# IPScout

**v1.0 prototype.** A Python terminal app and a React web app that show public IP addressing information for network technicians. Built for DEVASC Project Activity 3 (Option 2) using the free [ipapi.co](https://ipapi.co) REST API.

## Terminal app features
| Option | What it does |
|---|---|
| 1 | Shows this computer's public IP: version, ISP, ASN, city, region, country, postal code, timezone, coordinates |
| 2 | Looks up the same details for any public IPv4 or IPv6 address |
| 3 | Checks an IP offline: version and type (public, private, loopback...) |
| 4 | Looks up a domain name: resolves it to an IP, then shows that IP's details |
| 5 | Shows the lookup history for the current session |
| 6 | Exports the lookup history to `ipscout_history.csv` (opens in Excel) |
| 7 | Subnet calculator: network, netmask, wildcard, broadcast and host range from CIDR (IPv4 and IPv6, offline) |
| q | Quits the app |

## How to run the terminal app
Requires Python 3.8 or newer. On Windows use `py`; on Mac/Linux (including the DEVASC VM) use `python3`.

| Step | Windows | Mac / Linux |
|---|---|---|
| Install dependencies | `py -m pip install -r requirements.txt` | `python3 -m pip install -r requirements.txt` |
| Run the app | `py main.py` | `python3 main.py` |

No API key is needed. The free ipapi.co plan allows about 1,000 requests per day.

## React frontend
The `frontend` folder has a web version built with React and Vite. It doesn't need the Python app running.

The browser never calls ipapi.co directly, because ad blockers and Edge's Tracking Prevention block that domain. It calls the site's own `/api/ip` route instead:
- **On Vercel:** `api/ip.js` is a serverless function that calls ipapi.co. For "my IP" it looks up the visitor's IP from the `x-real-ip` header, not the server's.
- **With `npm run dev`:** `vite.config.js` forwards `/api/ip` to ipapi.co.

### Features
| Page | What it does |
|---|---|
| Home | Press **Go** to see this computer's public IP details, then **Again** to refresh them |
| Look Up | Type a public IPv4 or IPv6 address or a domain name like `google.com`, or click a sample, to see its details. **Again** repeats the lookup |
| Subnet | Type an IPv4 subnet like `192.168.1.0/24` to see its network, netmask, wildcard, broadcast and host range. Works offline |
| History | Lists the lookups from this visit, newest first (up to 20). Click one to open its details. **Export CSV** downloads the list; **Clear** empties it |

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

### How to deploy on Vercel
1. Import the repo into Vercel.
2. Set **Root Directory** to `frontend`, so Vercel finds the `api/` folder.
3. Leave the framework as **Vite** and deploy.

On Vercel, every ipapi.co request comes from Vercel's servers, so the free daily limit is shared. If results show "RateLimited", try again later.

### Frontend structure
| Path in `frontend` | Purpose |
|---|---|
| `index.html` | Page shell, including the first-load skeleton and background |
| `public/logo.svg` | IPScout logo and browser tab icon |
| `src/App.jsx` | Header, active page and footer |
| `api/ip.js` | Vercel serverless function that calls ipapi.co for the browser |
| `vite.config.js` | Vite setup, including the `/api/ip` proxy used by `npm run dev` |
| `src/api/` | `ipApi.js` calls `/api/ip`; `dnsApi.js` turns a domain into an IP using Google's public DNS (`dns.google`); `useIpRequest.js` tracks data, error and loading state |
| `src/utils/` | `ipChecker.js` validates IPs; `domainChecker.js` validates domain names; `ipDetails.js` picks the fields to display; `history.js` builds history entries; `subnetCalc.js` works out subnets; `csvExport.js` builds and downloads the CSV. The `.test.js` files next to them are the Vitest tests |
| `src/views/` | `MyIpView.jsx` (Home), `LookUpView.jsx` (Look Up), `SubnetView.jsx` (Subnet) and `HistoryView.jsx` (History) |
| `src/components/` | Header, footer, cards, results, skeleton, sample IPs and back-to-top button |
| `src/styles/` | `tokens.css` holds all design values; the other files hold layout, component, background and skeleton styles |

## Terminal app structure
| File | Purpose |
|---|---|
| `main.py` | Entry point. Runs the menu loop. |
| `menu.py` | Banner and menu text. |
| `tools.py` | Offline check, subnet calculator and CSV export options. |
| `subnet_calc.py` | Works out subnet details with Python's `ipaddress` module. |
| `csv_export.py` | Saves the lookup history to a CSV file with Python's `csv` module. |
| `lookups.py` | My IP, IP lookup and domain lookup options. |
| `domain_lookup.py` | Checks a domain name and resolves it to an IP with Python's `socket` module. |
| `history.py` | Keeps and shows the lookup history for the current session. |
| `ip_api.py` | Calls ipapi.co and turns network/API problems into error messages. |
| `ip_checker.py` | Checks that an IP is valid and public before looking it up, using Python's `ipaddress` module. |
| `display.py` | Detail tables, success and error messages. |
| `colors.py` | ANSI color codes used by `display.py`. |
| `tests/` | Unit tests. The API and DNS are mocked, so tests never use the daily API limit. |

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

## Automated testing (CI)
Every push and pull request runs `.github/workflows/ci.yml` on GitHub Actions. It has two jobs:
- **Python tests:** installs `requirements.txt` and runs the `unittest` tests in `tests/`.
- **Frontend tests and build:** runs the Vitest tests in `frontend/src/` and builds the React app.

The `main` branch is protected, so a pull request can only be merged when both jobs pass.

Run the tests locally:

| Tests | Command |
|---|---|
| Python (Windows) | `py -m unittest discover -s tests -v` |
| Python (Mac / Linux) | `python3 -m unittest discover -s tests -v` |
| Frontend | `cd frontend` then `npm test` |

## Known limitation
ipapi.co returns the address your connection uses to reach it: IPv6 if your network supports it, otherwise IPv4. It cannot return both in one request. The version shown in the results tells you which one you got.

## How to extend
- **New field from the API:** add a row in `build_ip_details()` in `display.py`. See the [ipapi.co docs](https://ipapi.co/api/) for available fields.
- **New menu option:** add a line to `print_menu()` in `menu.py`, write a new verb-named function in `lookups.py` (online) or `tools.py` (offline), and add an `elif` in `run_app()` in `main.py`.
- **New field in the web app:** add a row in `buildIpDetails()` in `frontend/src/utils/ipDetails.js`.
- **New sample IP:** add it to `SAMPLE_IPS` in `frontend/src/components/SampleIps.jsx`.
- **Colors and sizes in the web app:** change the values in `frontend/src/styles/tokens.css`. The logo's colors are set separately in `frontend/public/logo.svg`.
- **Code rules:** keep files around 50 lines, give each function one title comment, start function names with a verb (`fetch_`, `print_`, `check_`, `build_`), and show a red error message instead of crashing.
- **Future ideas:** see `BACKLOG.md`.

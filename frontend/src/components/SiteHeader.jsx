import GitHubLink from "./GitHubLink.jsx";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "lookup", label: "Look Up" },
];

// Show the logo, the page nav and the GitHub link
export default function SiteHeader({ page, onNavigate }) {
  return (
    <header className="site-header">
      <button className="wordmark" aria-label="IPScout home" onClick={() => onNavigate("home")}>
        <img className="logo" src="/logo.svg" alt="" />
      </button>
      <nav className="nav-group">
        {PAGES.map((item) => (
          <button
            key={item.id}
            className={item.id === page ? "nav-item nav-item-active" : "nav-item"}
            aria-current={item.id === page ? "page" : undefined}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header-contact">
        <GitHubLink href="https://github.com/senpaidell/ipscout" />
      </div>
    </header>
  );
}

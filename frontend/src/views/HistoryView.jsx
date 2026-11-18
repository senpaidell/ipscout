import FeatureCard from "../components/FeatureCard.jsx";

// History page
export default function HistoryView({ history, onClear }) {
  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Lookup history</h1>
        <p className="hero-subline">Your lookups from this visit, newest first</p>
        {history.length === 0 && <p className="hero-subline">No lookups yet. Try Home or Look Up first.</p>}
      </section>
      {history.length > 0 && (
        <section className="results">
          <div className="card-grid">
            {history.map((entry, index) => (
              <FeatureCard
                key={entry.time + "-" + index}
                title={entry.domain || entry.ip}
                body={(entry.domain ? entry.ip + " · " : "") + entry.place + " · " + new Date(entry.time).toLocaleTimeString()}
              />
            ))}
          </div>
          <button className="action-pill" onClick={onClear}>Clear</button>
        </section>
      )}
    </>
  );
}

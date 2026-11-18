import HistoryItem from "../components/HistoryItem.jsx";
import { buildCsv, downloadCsv } from "../utils/csvExport.js";

// History page
export default function HistoryView({ history, onClear }) {
  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Lookup history</h1>
        <p className="hero-subline">Your lookups from this visit, newest first. Click one to see its details.</p>
        {history.length === 0 && <p className="hero-subline">No lookups yet. Try Home or Look Up first.</p>}
      </section>
      {history.length > 0 && (
        <section className="results">
          <div className="history-list">
            {history.map((entry, index) => (
              <HistoryItem key={entry.time + "-" + index} entry={entry} />
            ))}
          </div>
          <div className="history-actions">
            <button className="action-pill" onClick={() => downloadCsv(buildCsv(history), "ipscout_history.csv")}>Export CSV</button>
            <button className="action-pill action-pill-quiet" onClick={onClear}>Clear</button>
          </div>
        </section>
      )}
    </>
  );
}

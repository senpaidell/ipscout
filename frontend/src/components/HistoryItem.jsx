import FeatureCard from "./FeatureCard.jsx";
import { buildIpDetails } from "../utils/ipDetails.js";

// History item
export default function HistoryItem({ entry }) {
  const time = new Date(entry.time).toLocaleTimeString();
  const subline = (entry.domain ? entry.ip + " · " : "") + entry.place + " · " + time;

  return (
    <details className="history-item">
      <summary className="history-summary">
        <span className="history-text">
          <span className="history-title">{entry.domain || entry.ip}</span>
          <span className="history-subline">{subline}</span>
        </span>
        <span className="history-chevron" aria-hidden="true" />
      </summary>
      <div className="history-details card-grid">
        <FeatureCard title="IP Address" body={entry.ip + " (" + (entry.data.version || "N/A") + ")"} />
        {buildIpDetails(entry.data).map((detail) => (
          <FeatureCard key={detail.label} title={detail.label} body={detail.value} />
        ))}
      </div>
    </details>
  );
}

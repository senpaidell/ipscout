import FeatureCard from "./FeatureCard.jsx";
import { buildIpDetails } from "../utils/ipDetails.js";

// Show the IP as a headline card, its details and the Again button
export default function IpResults({ data, onAgain }) {
  return (
    <section className="results">
      <FeatureCard title={data.ip} body={data.version} isDark />
      <div className="card-grid">
        {buildIpDetails(data).map((detail) => (
          <FeatureCard key={detail.label} title={detail.label} body={detail.value} />
        ))}
      </div>
      <button className="action-pill" onClick={onAgain}>Again</button>
    </section>
  );
}

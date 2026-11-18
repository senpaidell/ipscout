import { useState } from "react";
import FeatureCard from "../components/FeatureCard.jsx";
import { buildSubnetDetails, isValidSubnet } from "../utils/subnetCalc.js";

const SAMPLE_SUBNETS = ["192.168.1.0/24", "10.0.0.0/8", "172.16.5.77/20", "192.168.10.130/26"];

// Subnet page
export default function SubnetView() {
  const [input, setInput] = useState("");
  const [subnet, setSubnet] = useState("");
  const [error, setError] = useState("");

  // Run calculation
  function runCalculation(text) {
    setInput(text);
    setSubnet(isValidSubnet(text) ? text : "");
    setError(isValidSubnet(text) ? "" : "'" + text + "' is not a valid subnet. Use a form like 192.168.1.0/24.");
  }

  // Submit form
  function submitSubnet(event) {
    event.preventDefault();
    runCalculation(input.trim());
  }

  const details = subnet ? buildSubnetDetails(subnet) : [];

  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Subnet calculator</h1>
        <p className="hero-subline">Type an IPv4 subnet in CIDR form. Works offline, no API needed.</p>
        <form className="lookup-form" onSubmit={submitSubnet}>
          <input className="lookup-input" aria-label="Subnet in CIDR form" placeholder="192.168.1.0/24" value={input} onChange={(event) => setInput(event.target.value)} />
          <button className="lookup-button" type="submit">Calculate</button>
        </form>
        <div className="sample-ips">
          {SAMPLE_SUBNETS.map((sample) => (
            <button key={sample} className="sample-ip" onClick={() => runCalculation(sample)}>{sample}</button>
          ))}
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
      </section>
      {subnet && (
        <section className="results">
          <FeatureCard title={details[0].value} body={details[6].value + " usable hosts"} isDark />
          <div className="card-grid">
            {details.slice(1).map((detail) => (
              <FeatureCard key={detail.label} title={detail.label} body={detail.value} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

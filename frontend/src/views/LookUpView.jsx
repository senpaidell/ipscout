import { useState } from "react";
import { useIpRequest } from "../api/useIpRequest.js";
import { isPublicIp, isValidIp } from "../utils/ipChecker.js";
import { isValidDomain } from "../utils/domainChecker.js";
import IpResults from "../components/IpResults.jsx";
import IpResultsSkeleton from "../components/IpResultsSkeleton.jsx";
import SampleIps from "../components/SampleIps.jsx";

// Input problem
function findInputProblem(text) {
  if (isValidDomain(text)) return "";
  if (!isValidIp(text)) return "'" + text + "' is not a valid IP address or domain name.";
  if (!isPublicIp(text)) return text + " is not a public address. Only public IPs can be looked up.";
  return "";
}

// Look Up page
export default function LookUpView({ onLookup }) {
  const [input, setInput] = useState("");
  const { data, error, isLoading, loadIp, loadDomain, showError } = useIpRequest(onLookup);

  // Run lookup
  function runLookup(text) {
    const problem = findInputProblem(text);
    if (problem) showError(problem);
    else if (isValidDomain(text)) loadDomain(text.toLowerCase());
    else loadIp(text);
  }

  // Submit lookup
  function submitLookup(event) {
    event.preventDefault();
    runLookup(input.trim());
  }

  // Sample lookup
  function pickSample(sample) {
    setInput(sample);
    runLookup(sample);
  }

  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Look up an IP or domain</h1>
        <form className="lookup-form" onSubmit={submitLookup}>
          <input className="lookup-input" aria-label="IP address or domain name" placeholder="8.8.8.8 or google.com" value={input} onChange={(event) => setInput(event.target.value)} />
          <button className="lookup-button" type="submit" aria-label="Look up" aria-busy={isLoading} disabled={isLoading}>
            <span className={isLoading ? "lookup-label-hidden" : undefined}>Look up</span>
            {isLoading && <span className="button-spinner" />}
          </button>
        </form>
        <SampleIps isDisabled={isLoading} onPick={pickSample} />
        {error && <p className="error-message" role="alert">{error}</p>}
      </section>
      {isLoading && <IpResultsSkeleton />}
      {data && <IpResults data={data} onAgain={() => runLookup(data.domain || data.ip)} />}
    </>
  );
}

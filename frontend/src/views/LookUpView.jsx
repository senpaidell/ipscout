import { useState } from "react";
import { useIpRequest } from "../api/useIpRequest.js";
import { isPublicIp, isValidIp } from "../utils/ipChecker.js";
import IpResults from "../components/IpResults.jsx";
import IpResultsSkeleton from "../components/IpResultsSkeleton.jsx";
import SampleIps from "../components/SampleIps.jsx";

// Input problem
function findIpProblem(ip) {
  if (!isValidIp(ip)) return "'" + ip + "' is not a valid IPv4 or IPv6 address.";
  if (!isPublicIp(ip)) return ip + " is not a public address. Only public IPs can be looked up.";
  return "";
}

// Look Up page
export default function LookUpView() {
  const [ip, setIp] = useState("");
  const { data, error, isLoading, loadIp, showError } = useIpRequest();

  // Submit lookup
  function submitLookup(event) {
    event.preventDefault();
    const typedIp = ip.trim();
    const problem = findIpProblem(typedIp);
    if (problem) showError(problem);
    else loadIp(typedIp);
  }

  // Sample lookup
  function pickSample(sampleIp) {
    setIp(sampleIp);
    loadIp(sampleIp);
  }

  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Look up an IP</h1>
        <form className="lookup-form" onSubmit={submitLookup}>
          <input className="lookup-input" aria-label="IP address" placeholder="8.8.8.8" value={ip} onChange={(event) => setIp(event.target.value)} />
          <button className="lookup-button" type="submit" aria-label="Look up" aria-busy={isLoading} disabled={isLoading}>
            <span className={isLoading ? "lookup-label-hidden" : undefined}>Look up</span>
            {isLoading && <span className="button-spinner" />}
          </button>
        </form>
        <SampleIps isDisabled={isLoading} onPick={pickSample} />
        {error && <p className="error-message" role="alert">{error}</p>}
      </section>
      {isLoading && <IpResultsSkeleton />}
      {data && <IpResults data={data} onAgain={() => loadIp(data.ip)} />}
    </>
  );
}

import { useState } from "react";
import { fetchIpInfo } from "./ipApi.js";
import { fetchDomainIp } from "./dnsApi.js";

// IP request
export function useIpRequest(onLookup = () => {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Run request
  async function runRequest(getData) {
    setData(null);
    setError("");
    setIsLoading(true);
    try {
      const jsonData = await getData();
      setData(jsonData);
      onLookup(jsonData);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  // Load IP
  function loadIp(ip = "") {
    return runRequest(() => fetchIpInfo(ip));
  }

  // Load domain
  function loadDomain(domain) {
    return runRequest(async () => {
      const jsonData = await fetchIpInfo(await fetchDomainIp(domain));
      return { ...jsonData, domain };
    });
  }

  // Show error
  function showError(message) {
    setData(null);
    setError(message);
  }

  return { data, error, isLoading, loadIp, loadDomain, showError };
}

import { useState } from "react";
import { fetchIpInfo } from "./ipApi.js";

// Track the data, error and loading state of an IP request
export function useIpRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch details for an IP (blank ip = this computer)
  async function loadIp(ip = "") {
    setData(null);
    setError("");
    setIsLoading(true);
    try {
      setData(await fetchIpInfo(ip));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  // Clear the results and show an error
  function showError(message) {
    setData(null);
    setError(message);
  }

  return { data, error, isLoading, loadIp, showError };
}

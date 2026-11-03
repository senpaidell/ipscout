import { useState } from "react";
import { fetchIpInfo } from "./ipApi.js";

// IP request
export function useIpRequest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load IP
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

  // Show error
  function showError(message) {
    setData(null);
    setError(message);
  }

  return { data, error, isLoading, loadIp, showError };
}

const BASE_URL = "/api/ip";

// Fetch IP
export async function fetchIpInfo(ip = "") {
  const url = ip === "" ? BASE_URL : BASE_URL + "?ip=" + encodeURIComponent(ip);

  let reply;
  try {
    reply = await fetch(url);
  } catch {
    throw new Error("Could not reach ipapi.co. Check your connection or try again later.");
  }

  if (reply.status === 429) {
    throw new Error("Daily API limit reached. Try again later.");
  }
  if (reply.status === 502) {
    throw new Error("Could not reach ipapi.co. Try again later.");
  }
  if (!reply.ok) {
    throw new Error("API error (status code " + reply.status + ").");
  }

  const jsonData = await reply.json();
  if (jsonData.error) {
    throw new Error("API could not look up this IP: " + jsonData.reason);
  }
  return jsonData;
}

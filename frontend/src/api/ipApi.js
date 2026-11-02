const BASE_URL = "https://ipapi.co/";

// Fetch IP details from ipapi.co (blank ip = this computer)
export async function fetchIpInfo(ip = "") {
  const url = ip === "" ? BASE_URL + "json/" : BASE_URL + ip + "/json/";

  let reply;
  try {
    reply = await fetch(url);
  } catch {
    throw new Error("Could not reach ipapi.co. Check your connection or try again later.");
  }

  if (reply.status === 429) {
    throw new Error("Daily API limit reached. Try again later.");
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

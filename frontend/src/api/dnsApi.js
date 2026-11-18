const DNS_URL = "https://dns.google/resolve?type=A&name=";

// Fetch domain IP
export async function fetchDomainIp(domain) {
  let reply;
  try {
    reply = await fetch(DNS_URL + encodeURIComponent(domain));
  } catch {
    throw new Error("Could not reach the DNS service. Check your connection.");
  }
  if (!reply.ok) {
    throw new Error("DNS error (status code " + reply.status + ").");
  }

  const jsonData = await reply.json();
  const record = (jsonData.Answer || []).find((answer) => answer.type === 1);
  if (!record) {
    throw new Error("Could not find an IP address for " + domain + ".");
  }
  return record.data;
}

const MAX_ENTRIES = 20;

// History entry
export function buildHistoryEntry(data, time) {
  const city = data.city || "N/A";
  const country = data.country_name || "N/A";
  return { ip: data.ip || "N/A", domain: data.domain || "", place: city + ", " + country, time };
}

// Add entry
export function addHistoryEntry(history, entry) {
  return [entry, ...history].slice(0, MAX_ENTRIES);
}

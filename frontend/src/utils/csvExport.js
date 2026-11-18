import { buildIpDetails } from "./ipDetails.js";

// CSV cell
function formatCsvCell(value) {
  const text = String(value);
  return /[",\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
}

// CSV row
function buildCsvRow(entry) {
  const details = buildIpDetails(entry.data).map((detail) => detail.value);
  return [entry.domain, entry.ip, entry.data.version || "N/A", ...details, new Date(entry.time).toISOString()];
}

// CSV text
export function buildCsv(history) {
  const labels = buildIpDetails({}).map((detail) => detail.label);
  const header = ["Domain", "IP Address", "Version", ...labels, "Time"];
  const rows = [header, ...history.map(buildCsvRow)];
  return rows.map((row) => row.map(formatCsvCell).join(",")).join("\n");
}

// Download CSV
export function downloadCsv(text, fileName) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

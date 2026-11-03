// Pick the useful fields from the API data
export function buildIpDetails(data) {
  const get = (key) => data[key] || "N/A";

  return [
    { label: "ISP", value: get("org") },
    { label: "ASN", value: get("asn") },
    { label: "Network", value: get("network") },
    { label: "City", value: get("city") },
    { label: "Region", value: get("region") },
    { label: "Country", value: get("country_name") + " (" + get("country_code") + ")" },
    { label: "Postal Code", value: get("postal") },
    { label: "Timezone", value: get("timezone") + " (UTC " + get("utc_offset") + ")" },
    { label: "Coordinates", value: get("latitude") + ", " + get("longitude") },
  ];
}

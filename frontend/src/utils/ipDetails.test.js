import { describe, it, expect } from "vitest";
import { buildIpDetails } from "./ipDetails.js";

// Detail field tests
describe("buildIpDetails", () => {
  it("builds rows from API data", () => {
    const rows = buildIpDetails({ org: "Google LLC", country_name: "United States", country_code: "US" });
    expect(rows.find((row) => row.label === "ISP").value).toBe("Google LLC");
    expect(rows.find((row) => row.label === "Country").value).toBe("United States (US)");
  });

  it("shows N/A for missing fields", () => {
    const rows = buildIpDetails({});
    expect(rows.find((row) => row.label === "City").value).toBe("N/A");
  });
});

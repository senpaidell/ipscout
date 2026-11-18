import { describe, it, expect } from "vitest";
import { buildCsv } from "./csvExport.js";

const ENTRY = {
  ip: "1.1.1.1",
  domain: "one.one.one.one",
  time: 0,
  data: { ip: "1.1.1.1", version: "IPv4", org: "Cloudflare, Inc.", city: "Sydney" },
};

// CSV export tests
describe("buildCsv", () => {
  it("starts with a header row", () => {
    const header = buildCsv([]).split("\n")[0];
    expect(header.startsWith("Domain,IP Address,Version,ISP")).toBe(true);
    expect(header.endsWith(",Time")).toBe(true);
  });

  it("adds one row per lookup", () => {
    const lines = buildCsv([ENTRY, ENTRY]).split("\n");
    expect(lines.length).toBe(3);
    expect(lines[1].startsWith("one.one.one.one,1.1.1.1,IPv4,")).toBe(true);
  });

  it("quotes values that contain commas", () => {
    const row = buildCsv([ENTRY]).split("\n")[1];
    expect(row).toContain('"Cloudflare, Inc."');
    expect(row).toContain("1970-01-01T00:00:00.000Z");
  });
});

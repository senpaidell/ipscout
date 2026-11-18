import { describe, it, expect } from "vitest";
import { addHistoryEntry, buildHistoryEntry } from "./history.js";

// History tests
describe("buildHistoryEntry", () => {
  it("builds an entry from API data", () => {
    const data = { ip: "8.8.8.8", city: "Mountain View", country_name: "United States" };
    const entry = buildHistoryEntry(data, 1000);
    expect(entry).toEqual({ ip: "8.8.8.8", domain: "", place: "Mountain View, United States", time: 1000, data });
  });

  it("shows N/A for missing fields", () => {
    expect(buildHistoryEntry({ ip: "1.1.1.1", domain: "one.one" }, 0).place).toBe("N/A, N/A");
  });
});

describe("addHistoryEntry", () => {
  it("puts the newest entry first", () => {
    const list = addHistoryEntry([{ ip: "1.1.1.1" }], { ip: "8.8.8.8" });
    expect(list[0].ip).toBe("8.8.8.8");
  });

  it("keeps at most 20 entries", () => {
    let list = [];
    for (let i = 0; i < 25; i++) list = addHistoryEntry(list, { ip: String(i) });
    expect(list.length).toBe(20);
  });
});

import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchDomainIp } from "./dnsApi.js";

// Fake reply
function mockReply(jsonData) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => jsonData }));
}

// DNS API tests
describe("fetchDomainIp", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns the first IPv4 address", async () => {
    mockReply({ Answer: [{ type: 5, data: "alias.example." }, { type: 1, data: "140.82.112.4" }] });
    expect(await fetchDomainIp("github.com")).toBe("140.82.112.4");
  });

  it("shows an error for an unknown domain", async () => {
    mockReply({ Status: 3 });
    await expect(fetchDomainIp("no-such-site.example")).rejects.toThrow("Could not find");
  });

  it("shows an error when offline", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect(fetchDomainIp("google.com")).rejects.toThrow("Could not reach");
  });
});

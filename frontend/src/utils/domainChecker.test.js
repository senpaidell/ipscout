import { describe, it, expect } from "vitest";
import { isValidDomain } from "./domainChecker.js";

// Domain checker tests
describe("isValidDomain", () => {
  it("accepts domain names", () => {
    expect(isValidDomain("google.com")).toBe(true);
    expect(isValidDomain("www.my-site.org")).toBe(true);
  });

  it("rejects text that is not a domain", () => {
    expect(isValidDomain("google")).toBe(false);
    expect(isValidDomain("bad..com")).toBe(false);
    expect(isValidDomain("-bad.com")).toBe(false);
    expect(isValidDomain("8.8.8.8")).toBe(false);
  });
});

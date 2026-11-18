import { describe, it, expect } from "vitest";
import { isValidIp, isPublicIp } from "./ipChecker.js";

// IP checker tests
describe("isValidIp", () => {
  it("accepts IPv4 and IPv6 addresses", () => {
    expect(isValidIp("8.8.8.8")).toBe(true);
    expect(isValidIp("2001:4860:4860::8888")).toBe(true);
  });

  it("rejects invalid text", () => {
    expect(isValidIp("abc")).toBe(false);
    expect(isValidIp("256.1.1.1")).toBe(false);
    expect(isValidIp("")).toBe(false);
  });
});

describe("isPublicIp", () => {
  it("detects public addresses", () => {
    expect(isPublicIp("8.8.8.8")).toBe(true);
    expect(isPublicIp("2001:4860:4860::8888")).toBe(true);
  });

  it("detects private and reserved addresses", () => {
    expect(isPublicIp("192.168.1.1")).toBe(false);
    expect(isPublicIp("10.0.0.1")).toBe(false);
    expect(isPublicIp("127.0.0.1")).toBe(false);
    expect(isPublicIp("::1")).toBe(false);
  });
});

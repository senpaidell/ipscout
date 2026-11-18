import { describe, it, expect } from "vitest";
import { buildSubnetDetails, isValidSubnet } from "./subnetCalc.js";

// Find value
function findValue(details, label) {
  return details.find((detail) => detail.label === label).value;
}

// Subnet calculator tests
describe("isValidSubnet", () => {
  it("accepts CIDR subnets", () => {
    expect(isValidSubnet("192.168.1.0/24")).toBe(true);
    expect(isValidSubnet("10.0.0.0/8")).toBe(true);
  });

  it("rejects text that is not a subnet", () => {
    expect(isValidSubnet("192.168.1.0")).toBe(false);
    expect(isValidSubnet("192.168.1.0/33")).toBe(false);
    expect(isValidSubnet("abc/24")).toBe(false);
  });
});

describe("buildSubnetDetails", () => {
  it("works out a /26 subnet", () => {
    const details = buildSubnetDetails("192.168.1.77/26");
    expect(findValue(details, "Network")).toBe("192.168.1.64/26");
    expect(findValue(details, "Netmask")).toBe("255.255.255.192");
    expect(findValue(details, "Wildcard")).toBe("0.0.0.63");
    expect(findValue(details, "Broadcast")).toBe("192.168.1.127");
    expect(findValue(details, "First Host")).toBe("192.168.1.65");
    expect(findValue(details, "Last Host")).toBe("192.168.1.126");
    expect(findValue(details, "Usable Hosts")).toBe("62");
  });

  it("handles large and tiny subnets", () => {
    expect(findValue(buildSubnetDetails("10.0.0.0/8"), "Usable Hosts")).toBe("16,777,214");
    expect(findValue(buildSubnetDetails("0.0.0.0/0"), "Netmask")).toBe("0.0.0.0");
    expect(findValue(buildSubnetDetails("10.0.0.5/32"), "Usable Hosts")).toBe("1");
  });
});

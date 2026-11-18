import { isValidIpv4 } from "./ipChecker.js";

// IP to number
function convertIpToNumber(ip) {
  return ip.split(".").reduce((total, part) => total * 256 + Number(part), 0);
}

// Number to IP
function convertNumberToIp(number) {
  return [24, 16, 8, 0].map((shift) => Math.floor(number / 2 ** shift) % 256).join(".");
}

// Subnet check
export function isValidSubnet(text) {
  const parts = text.split("/");
  if (parts.length !== 2 || !/^\d{1,2}$/.test(parts[1])) return false;
  return isValidIpv4(parts[0]) && Number(parts[1]) <= 32;
}

// Subnet details
export function buildSubnetDetails(text) {
  const [ip, prefixText] = text.split("/");
  const prefix = Number(prefixText);
  const total = 2 ** (32 - prefix);
  const network = Math.floor(convertIpToNumber(ip) / total) * total;
  const broadcast = network + total - 1;
  const isTiny = total <= 2;

  return [
    { label: "Network", value: convertNumberToIp(network) + "/" + prefix },
    { label: "Netmask", value: convertNumberToIp(2 ** 32 - total) },
    { label: "Wildcard", value: convertNumberToIp(total - 1) },
    { label: "Broadcast", value: convertNumberToIp(broadcast) },
    { label: "First Host", value: convertNumberToIp(isTiny ? network : network + 1) },
    { label: "Last Host", value: convertNumberToIp(isTiny ? broadcast : broadcast - 1) },
    { label: "Usable Hosts", value: (isTiny ? total : total - 2).toLocaleString("en-US") },
    { label: "Total Addresses", value: total.toLocaleString("en-US") },
  ];
}

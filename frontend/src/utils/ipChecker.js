const IPV4_PATTERN = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

// Check if text is a valid IPv4 address
function isValidIpv4(text) {
  return IPV4_PATTERN.test(text);
}

// Check if text is a valid IPv6 address
function isValidIpv6(text) {
  if (!text.includes(":")) return false;
  try {
    new URL("http://[" + text + "]");
    return true;
  } catch {
    return false;
  }
}

// Check if text is a valid IPv4 or IPv6 address
export function isValidIp(text) {
  return isValidIpv4(text) || isValidIpv6(text);
}

// Check if an IPv4 address is in a non-public range
function isNonPublicIpv4(text) {
  const [a, b] = text.split(".").map(Number);
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

// Check if an IPv6 address is in a non-public range
function isNonPublicIpv6(text) {
  const ip = text.toLowerCase();
  return ip === "::" || ip === "::1" || /^(f[c-d]|fe[89ab]|ff)/.test(ip);
}

// Check if an address can be looked up on the public internet
export function isPublicIp(text) {
  return isValidIpv4(text) ? !isNonPublicIpv4(text) : !isNonPublicIpv6(text);
}

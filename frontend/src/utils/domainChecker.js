import { isValidIp } from "./ipChecker.js";

const LABEL_PATTERN = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;

// Domain check
export function isValidDomain(text) {
  const parts = text.split(".");
  if (parts.length < 2 || isValidIp(text)) return false;
  return parts.every((part) => LABEL_PATTERN.test(part));
}

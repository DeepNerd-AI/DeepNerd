const RESERVED_USERNAMES = new Set([
  "admin",
  "support",
  "billing",
  "help",
  "api",
  "root",
  "settings",
  "dashboard",
  "deepnerd",
  "about",
  "docs",
  "security",
  "system",
  "team",
  "null",
  "undefined",
]);

export function normalizeUsername(input: string) {
  return input.trim().toLowerCase();
}

export function isValidUsername(username: string) {
  return /^[a-z0-9_]{3,24}$/.test(username);
}

export function isReservedUsername(username: string) {
  return RESERVED_USERNAMES.has(normalizeUsername(username));
}

export function buildUsernameSuggestions(baseInput: string) {
  const base = normalizeUsername(baseInput).replace(/[^a-z0-9_]/g, "").slice(0, 16) || "developer";
  const suffix = Math.floor(Math.random() * 9000 + 1000);
  return [`${base}_${suffix}`, `${base}_dev`, `${base}_ai`];
}

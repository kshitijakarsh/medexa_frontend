// utils/name.ts

/** Get initials from a name: "John Doe" → "JD" */
export function getInitials(name?: string): string {
  if (!name) return "NA";

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("") || "NA";
}

/** Format a name properly: "roBERT washINGTon" → "Robert Washington" */
export function formatName(name?: string): string {
  if (!name) return "";

  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

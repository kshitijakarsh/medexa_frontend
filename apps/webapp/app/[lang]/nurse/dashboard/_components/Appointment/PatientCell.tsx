"use client";

import { UserAvatar } from "../../../../../../components/common/pasient-card/user-avatar";

function getInitials(name?: string) {
  if (!name) return "NA";

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean) // remove empty strings
    .map((part) => part.charAt(0).toUpperCase()) // safe access
    .slice(0, 2)
    .join("") || "NA";
}

function formatName(name?: string) {
  if (!name) return "";

  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}


export function PatientCell({ name, mrn, avatar }: any) {
  const initials = getInitials(name);
  const formattedName = formatName(name);

  return (
    <div className="flex items-center gap-3">
      <UserAvatar
        src={avatar}
        fallback={initials} // 👈 Use initials instead of “NA”
        size={36}
      />

      <div>
        <div className="font-medium">{formattedName}</div>
        <div className="text-xs text-gray-400">{mrn}</div>
      </div>
    </div>
  );
}

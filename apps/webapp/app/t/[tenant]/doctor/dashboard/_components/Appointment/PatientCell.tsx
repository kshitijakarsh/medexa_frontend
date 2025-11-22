"use client";

import { UserAvatar } from "../../../../../../../components/common/pasient-card/user-avatar";

export function PatientCell({ name, mrn, avatar }: any) {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar src={avatar} size={36} />

      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-400">{mrn}</div>
      </div>
    </div>
  );
}

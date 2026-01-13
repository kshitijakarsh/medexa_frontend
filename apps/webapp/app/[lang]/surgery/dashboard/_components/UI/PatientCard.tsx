"use client";

import { Slice } from "lucide-react";
import { CardBlock } from "@/components/common/pasient-card/card-block";
import { AppointmentPatientCell } from "@/components/common/pasient-card/appointment-patient-cell";

import { TimeRoomInfo } from "@/components/common/pasient-card/time-room-info";
import { TypeBadge } from "@/components/common/pasient-card/type-badge";
import { useRouter, useParams } from "next/navigation";

type PatientCardProps = {
  id: string;
  avatar: string;
  name: string;
  mrn: string;
  procedure: string;
  time: string;
  room: string;
  status?: string;
  vip?: boolean;
};

export default function PatientCard({
  id,
  avatar,
  name,
  mrn,
  procedure,
  time,
  room,
  status = "Scheduled",
  vip = false,
}: PatientCardProps) {
  const router = useRouter();
  const { lang } = useParams();

  return (
    <CardBlock
      className="
        flex h-28 w-full flex-col justify-between
        rounded-xl bg-background p-3"
    >
      {/* TOP — Patient */}
      <AppointmentPatientCell
        name={name}
        mrn={mrn}
        avatar={avatar}
        vip={vip}
        status={status === "Emergency" ? status : undefined}
      />

      {/* MIDDLE — Procedure */}
      <div className="mt-1 flex items-center gap-2">
        <Slice size={14} className="shrink-0 text-blue-500" />
        <TypeBadge type={procedure} />
      </div>

      <div className="flex items-center justify-between">
        <TimeRoomInfo time={time} room={room} />

        <div
          onClick={() => {
            router.push(`/${lang}/surgery/dashboard/surgery-details/${id}`);
          }}
          className="cursor-pointer"
        >
          <span className="text-xs font-medium text-blue-500">
            Schedule
          </span>
        </div>
      </div>
    </CardBlock>
  );
}

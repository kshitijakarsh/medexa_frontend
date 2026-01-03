"use client";

import { format } from "@workspace/ui/hooks/use-date-fns";
import { NurseNote } from "./NurseNote";

interface NurseNoteCardProps {
  data: NurseNote;
}

import { useDictionary } from "@/i18n/dictionary-context";

export default function NurseNoteCard({ data }: NurseNoteCardProps) {
  const dict = useDictionary();
  const name = data.createdBy?.name ?? dict.pages.doctor.appointment.tabsContent.nurseNote.card.fallbackName;
  const time = format(new Date(data.created_at), "dd MMM yyyy, hh:mm a");

  // Optional avatar fallback (initials)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        {data.createdBy?.avatar ? (
          <img
            src={data.createdBy.avatar}
            alt={name}
            className="w-14 h-14 object-cover rounded-full"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            {initials}
          </div>
        )}

        <div className="flex-1">
          {/* Name + Time */}
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500 mb-2">{time}</p>

          {/* Note Text */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.note}
          </p>
        </div>
      </div>
    </div>
  );
}

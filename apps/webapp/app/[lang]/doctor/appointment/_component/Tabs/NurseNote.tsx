"use client";

import { SectionWrapper } from "./common/SectionWrapper";
import NurseNoteCard from "./nurse-note/NurseNoteCard";

export default function NurseNotesSection() {
    const notes = [
        {
            id: 1,
            name: "Ameena K.",
            avatar: "/images/avatars/1.png",
            time: "Nov 14, 2024 10:30 AM",
            note:
                "Patient reports feeling dizzy this morning. Blood pressure is slightly elevated at 145/90. Administered initial dose of prescribed medication, Patient seems stable but anxious.",
        },
        {
            id: 2,
            name: "Ameena K.",
            avatar: "/images/avatars/1.png",
            time: "Nov 14, 2024 10:30 AM",
            note:
                "Patient reports feeling dizzy this morning. Blood pressure is slightly elevated at 145/90. Administered initial dose of prescribed medication, Patient seems stable but anxious.",
        },
        {
            id: 3,
            name: "Ameena K.",
            avatar: "/images/avatars/1.png",
            time: "Nov 14, 2024 10:30 AM",
            note:
                "Patient reports feeling dizzy this morning. Blood pressure is slightly elevated at 145/90. Administered initial dose of prescribed medication, Patient seems stable but anxious.",
        },
    ];

    return (
        <SectionWrapper
            header={
                <>
                    {/* Header */}
                    <h2 className="text-lg font-semibold">Nurse Note</h2>
                </>
            }
        >
            {/* Notes List */}
            <div className="space-y-4">
                {notes.map((note) => (
                    <NurseNoteCard key={note.id} data={note} />
                ))}
            </div>
        </SectionWrapper >
    );
}

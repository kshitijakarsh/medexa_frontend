// "use client";

// import { SectionWrapper } from "./common/SectionWrapper";
// import NurseNoteCard from "./nurse-note/NurseNoteCard";

// export default function NurseNotesSection() {
//     return (
//         <SectionWrapper
//             header={
//                 <>
//                     {/* Header */}
//                     <h2 className="text-lg font-semibold">Nurse Note</h2>
//                 </>
//             }
//         >
//             {/* Notes List */}
//             <div className="space-y-4">
//                 {notes.map((note) => (
//                     <NurseNoteCard key={note.id} data={note} />
//                 ))}
//             </div>
//         </SectionWrapper >
//     );
// }

"use client";

import { SectionWrapper } from "./common/SectionWrapper";
import { SectionTitle } from "./common/SectionTitle";
import { useParams } from "next/navigation";
import { useNurseNoteByVisitId } from "./_hooks/useNurseNotes";
import NurseNoteCard from "./nurse-note/NurseNoteCard";
import NurseNoteCardSkeleton from "./nurse-note/NurseNoteCardSkeleton";
import { NurseNotesHistory } from "./nurse-note/NurseNotesHistory";

interface NurseNotesProps {
    patientId: string,
}

export default function NurseNotesSection({ patientId }: NurseNotesProps) {
    const { id: visitId } = useParams() as { id: string };

    const { data, isLoading } = useNurseNoteByVisitId(visitId);

    return (
        <>
            <SectionWrapper
                header={
                    <div className="flex items-center gap-3">
                        <SectionTitle title="Nurse Note" />
                    </div>
                }
            >
                {/* Skeleton */}
                {isLoading && (
                    <div className="space-y-4">
                        <NurseNoteCardSkeleton />
                        <NurseNoteCardSkeleton />
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && !data && (
                    <p className="text-gray-600 italic">
                        No nurse notes recorded for this visit.
                    </p>
                )}

                {/* Data */}
                {!isLoading && data && (
                    <div className="space-y-4">
                        <NurseNoteCard data={data} />
                    </div>
                )}
            </SectionWrapper>
            <NurseNotesHistory patientId={patientId} />

        </>
    );
}

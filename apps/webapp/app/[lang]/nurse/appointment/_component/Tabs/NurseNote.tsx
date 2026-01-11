// // "use client";

// // import { SectionWrapper } from "./common/SectionWrapper";
// // import NurseNoteCard from "./nurse-note/NurseNoteCard";

// // export default function NurseNotesSection() {
// //     return (
// //         <SectionWrapper
// //             header={
// //                 <>
// //                     {/* Header */}
// //                     <h2 className="text-lg font-semibold">Nurse Note</h2>
// //                 </>
// //             }
// //         >
// //             {/* Notes List */}
// //             <div className="space-y-4">
// //                 {notes.map((note) => (
// //                     <NurseNoteCard key={note.id} data={note} />
// //                 ))}
// //             </div>
// //         </SectionWrapper >
// //     );
// // }

// "use client";

// import { SectionWrapper } from "./common/SectionWrapper";
// import { SectionTitle } from "./common/SectionTitle";
// import { useParams } from "next/navigation";
// import { getNurseNoteByVisitIdNurse, useNurseNoteByVisitId } from "./_hooks/useNurseNotes";
// import NurseNoteCard from "./nurse-note/NurseNoteCard";
// import NurseNoteCardSkeleton from "./nurse-note/NurseNoteCardSkeleton";
// import { NurseNotesHistory } from "./nurse-note/NurseNotesHistory";

// interface NurseNotesProps {
//     patientId: string,
// }

// export default function NurseNotesSection({ patientId }: NurseNotesProps) {
//     const { id: visitId } = useParams() as { id: string };

//     const { data, isLoading } = getNurseNoteByVisitIdNurse(visitId);

//     return (
//         <>
//             <SectionWrapper
//                 header={
//                     <div className="flex items-center gap-3">
//                         <SectionTitle title="Nurse Note" />
//                     </div>
//                 }
//             >
//                 {/* Skeleton */}
//                 {isLoading && (
//                     <div className="space-y-4">
//                         <NurseNoteCardSkeleton />
//                         <NurseNoteCardSkeleton />
//                     </div>
//                 )}

//                 {/* Empty state */}
//                 {!isLoading && !data && (
//                     <p className="text-gray-600 italic">
//                         No nurse notes recorded for this visit.
//                     </p>
//                 )}

//                 {/* Data */}
//                 {!isLoading && data && (
//                     <div className="space-y-4">
//                         {data.map(({ noteData }: any) => (
//                             <NurseNoteCard key={noteData.id} data={noteData} />

//                         ))}
//                     </div>
//                 )}
//             </SectionWrapper>
//             <NurseNotesHistory patientId={patientId} />

//         </>
//     );
// }



"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import {
    useNurseNotesByVisit,
    useCreateNurseNote,
    useUpdateNurseNote,
    useDeleteNurseNote,
} from "./_hooks/useNurseNotes";

import NurseNoteCard from "./nurse-note/NurseNoteCard";
import { NurseNoteModal } from "./nurse-note/NurseNoteModal";
import { ViewNurseNoteModal } from "./nurse-note/ViewNurseNoteModal";
import { SectionWrapper } from "./common/SectionWrapper";
import { SectionTitle } from "./common/SectionTitle";
import { NurseNote } from "./nurse-note/NurseNote";
import NewButton from "@/components/common/new-button";
import { NurseNotesHistory } from "./nurse-note/NurseNotesHistory";
import { toast } from "@workspace/ui/lib/sonner";

export default function NurseNotesSection({ patientId }: { patientId: string }) {
    const { id: visitId } = useParams() as { id: string };

    const { data = [], isLoading } = useNurseNotesByVisit(visitId);

    const createNote = useCreateNurseNote(visitId);
    const updateNote = useUpdateNurseNote(visitId);
    const deleteNote = useDeleteNurseNote(visitId);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [viewing, setViewing] = useState<any>(null);

    return (
        <>
            <SectionWrapper
                header={
                    <div className="flex justify-between items-center">
                        <SectionTitle title="Nurse Notes" />
                        {/* <Button onClick={() => setOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" /> Add Nurse Note
            </Button> */}
                        <NewButton name="Add Nurse Note" handleClick={() => setOpen(true)} />
                    </div>
                }
            >
                {!isLoading && data.length === 0 && (
                    <p className="text-gray-500 italic text-center">
                        No nurse notes available.
                    </p>
                )}

                <div className="space-y-4">
                    {data.map((note) => (
                        <NurseNoteCard
                            key={note.id}
                            data={note}
                            onView={() => {
                                setViewing(note);
                                setViewOpen(true);
                            }}
                            onEdit={() => {
                                setEditing(note);
                                setOpen(true);
                            }}
                            // onDelete={() => deleteNote.mutate(note.id)}
                            onDelete={() => {
                                if (!confirm("Are you sure you want to delete this nurse note?")) return;

                                deleteNote.mutate(note.id, {
                                    // onSuccess: () => toast.success("Nurse note deleted"),
                                    onError: (e: any) =>
                                        toast.error(e.message || "Failed to delete nurse note"),
                                });
                            }}
                        />
                    ))}
                </div>
            </SectionWrapper>
            <NurseNotesHistory patientId={patientId} />

            <NurseNoteModal
                open={open}
                initial={editing}
                loading={createNote.isPending || updateNote.isPending}
                onClose={() => {
                    if (createNote.isPending || updateNote.isPending) return; // 🔒 prevent close
                    setOpen(false);
                    setEditing(null);
                }}

                // onSubmit={async (values) => {
                //     if (editing) {
                //         await updateNote.mutate({ id: editing.id, payload: values });
                //     } else {
                //         await createNote.mutate({
                //             visit_id: visitId,
                //             patient_id: patientId,
                //             ...values,
                //         });
                //     }
                //     setOpen(false);
                //     setEditing(null);
                // }}
                onSubmit={async (values) => {
                    try {
                        if (editing) {
                            await updateNote.mutateAsync({
                                id: editing.id,
                                payload: values,
                            });
                        } else {
                            await createNote.mutateAsync({
                                visit_id: visitId,
                                patient_id: patientId,
                                ...values,
                            });
                        }

                        // ✅ only closes AFTER API success
                        setOpen(false);
                        setEditing(null);
                    } catch (err) {
                        // error toast already handled in hook
                    }
                }}
            />

            <ViewNurseNoteModal
                open={viewOpen}
                note={viewing}
                onClose={() => {
                    setViewOpen(false);
                    setViewing(null);
                }}
            />
        </>
    );
}

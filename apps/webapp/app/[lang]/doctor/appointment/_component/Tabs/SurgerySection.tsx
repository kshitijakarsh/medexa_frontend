// "use client";

// import { useState } from "react";
// import NewButton from "@/components/common/new-button";
// import AddSurgeryModal from "./surgery-section/AddSurgeryModal";
// import SurgeryTable from "./surgery-section/SurgeryTable";
// import SurgeryDetailsModal from "./surgery-section/SurgeryDetailsModal"; // placeholder for now
// import { SectionWrapper } from "./common/SectionWrapper";
// import { EmptySurgeryState } from "./surgery-section/EmptyState";
// import { useParams, useRouter } from "next/navigation";

// export default function SurgerySection() {
//     const router = useRouter();
//     const { id } = useParams();

//     const [showAddModal, setShowAddModal] = useState(false);
//     const [viewItem, setViewItem] = useState(null);

//     const [surgeries, setSurgeries] = useState([
//         // sample data
//         {
//             id: 1,
//             type: "Knee Replacement",
//             category: "Orthopedics",
//             urgency: "Elective",
//             status: "Ordered",
//         },
//         {
//             id: 2,
//             type: "Cholecystectomy",
//             category: "General Surgery",
//             urgency: "Urgent",
//             status: "Completed",
//         },
//     ]);

//     const addSurgery = (data) => {
//         setSurgeries((prev) => [
//             ...prev,
//             { id: prev.length + 1, status: "Ordered", ...data },
//         ]);
//     };

//     return (
//         <SectionWrapper
//             header={
//                 <>
//                     {/* Header */}
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-lg font-semibold">Surgery</h2>
//                         <NewButton name="Add Surgery" handleClick={() => setShowAddModal(true)} />
//                     </div>

//                 </>
//             }
//         >


//             {/* Content */}
//             {surgeries.length === 0 ? (
//                 <EmptySurgeryState onAdd={() => setShowAddModal(true)} />
//             ) : (
//                 <>
//                     <SurgeryTable
//                         data={surgeries}
//                         onView={(item) => router.push(`/doctor/appointment/${id}/surgery-details/${item.id}`)}
//                     />
//                 </>
//             )}

//             {/* Modals */}
//             <AddSurgeryModal
//                 open={showAddModal}
//                 onClose={() => setShowAddModal(false)}
//                 onSubmit={addSurgery}
//             />

//             {/* {viewItem && (
//                 <SurgeryDetailsModal
//                     open={true}
//                     onClose={() => setViewItem(null)}
//                     surgery={viewItem}
//                 />
//             )} */}
//         </SectionWrapper>
//     );
// }


"use client";

import { useState } from "react";
import NewButton from "@/components/common/new-button";
import AddSurgeryModal from "./surgery-section/AddSurgeryModal";
import SurgeryTable from "./surgery-section/SurgeryTable";
import { SectionWrapper } from "./common/SectionWrapper";
import { EmptySurgeryState } from "./surgery-section/EmptyState";
import { useParams, useRouter } from "next/navigation";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";
import { ROUTES } from "@/lib/routes";

type SurgeryOrder = {
  id: number;
  type: string;
  category: string;
  urgency: "elective" | "urgent" | "emergency";
  status: "ordered" | "completed";
};

type AddSurgeryInput = {
  surgeryType: string;
  category: string;
  urgency: "elective" | "urgent" | "emergency"; // ✅ strict union
  notes?: string;
};

export default function SurgerySection() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { withLocale } = useLocaleRoute();

  const [showAddModal, setShowAddModal] = useState(false);
  const [viewItem, setViewItem] = useState<SurgeryOrder | null>(null);

  const [surgeries, setSurgeries] = useState<SurgeryOrder[]>([
    {
      id: 1,
      type: "Knee Replacement",
      category: "Orthopedics",
      urgency: "elective",
      status: "ordered",
    },
    {
      id: 2,
      type: "Cholecystectomy",
      category: "General Surgery",
      urgency: "urgent",
      status: "completed",
    },
  ]);

  const addSurgery = (data: AddSurgeryInput) => {
    setSurgeries((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: data.surgeryType,
        category: data.category,
        urgency: data.urgency,
        status: "ordered",
      },
    ]);
  };

  return (
    <SectionWrapper
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Surgery</h2>
          <NewButton
            name="Add Surgery"
            handleClick={() => setShowAddModal(true)}
          />
        </div>
      }
    >
      {surgeries.length === 0 ? (
        <EmptySurgeryState onAdd={() => setShowAddModal(true)} />
      ) : (
        <SurgeryTable
          data={surgeries}
          onView={(item) =>
            router.push(
              `${withLocale(`${ROUTES.DOCTOR_APPOINTMENT_SCREENING}${id}/surgery-details/${item.id}`)}`
            )
          }
        />
      )}

      <AddSurgeryModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        // onSubmit={addSurgery}
      />
    </SectionWrapper>
  );
}

// // "use client";

// // import { useState } from "react";
// // import { Input } from "@workspace/ui/components/input";
// // import { Textarea } from "@workspace/ui/components/textarea";
// // import {
// //     Select,
// //     SelectTrigger,
// //     SelectValue,
// //     SelectContent,
// //     SelectItem,
// // } from "@workspace/ui/components/select";
// // import { Card, CardContent } from "@workspace/ui/components/card";
// // import { Eye } from "lucide-react";

// // export function VisitPurposeForm() {
// //     const [form, setForm] = useState({
// //         chiefComplaint: "",
// //         history: "",
// //         onset: "",
// //         duration: "",
// //         severity: "",
// //         notes: "",
// //     });

// //     const handleChange = (field: string, value: string) => {
// //         setForm(prev => ({ ...prev, [field]: value }));
// //     };

// //     const fluidOptions = [
// //         "Minutes",
// //         "Hours",
// //         "Days",
// //         "Weeks",
// //         "Months",
// //         "Sudden",
// //         "Gradual",
// //     ];

// //     return (
// //         <div className="flex flex-col gap-6">

// //             {/* Chief Complaint */}
// //             {/* <Card className="rounded-xl shadow-sm border">
// //         <CardContent className="p-5 flex flex-col gap-6"> */}
// //             <div className="p-0 flex flex-col gap-6">

// //                 <div className="flex flex-col gap-2">
// //                     <label className="font-medium text-sm">Chief Complaint</label>
// //                     <Input
// //                         placeholder="Stomach discomfort"
// //                         value={form.chiefComplaint}
// //                         onChange={(e) =>
// //                             handleChange("chiefComplaint", e.target.value)
// //                         }
// //                     />
// //                 </div>

// //                 {/* History of Present Illness */}
// //                 <div className="flex flex-col gap-2">
// //                     <label className="font-medium text-sm">
// //                         History of Present Illness
// //                     </label>
// //                     <Textarea
// //                         placeholder="Enter History of Present Illness"
// //                         className="min-h-[120px]"
// //                         value={form.history}
// //                         onChange={(e) =>
// //                             handleChange("history", e.target.value)
// //                         }
// //                     />
// //                 </div>

// //                 {/* Onset / Duration / Severity */}
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                     {[
// //                         { label: "Onset", key: "onset" },
// //                         { label: "Duration", key: "duration" },
// //                         { label: "Severity", key: "severity" },
// //                     ].map(({ label, key }) => (
// //                         <div key={key} className="flex flex-col gap-2">
// //                             <label className="font-medium text-sm">{label}</label>
// //                             <Select
// //                                 value={form[key as keyof typeof form]}
// //                                 onValueChange={(v) => handleChange(key, v)}
// //                             >
// //                                 <SelectTrigger className="w-full">
// //                                     <SelectValue placeholder="Select Fluid Type" />
// //                                 </SelectTrigger>
// //                                 <SelectContent>
// //                                     {fluidOptions.map((opt) => (
// //                                         <SelectItem key={opt} value={opt}>
// //                                             {opt}
// //                                         </SelectItem>
// //                                     ))}
// //                                 </SelectContent>
// //                             </Select>
// //                         </div>
// //                     ))}
// //                 </div>

// //                 {/* Additional Notes */}
// //                 <div className="flex flex-col gap-2">
// //                     <label className="font-medium text-sm">Additional Notes</label>
// //                     <Textarea
// //                         placeholder="Enter Immediate Risk Assessment"
// //                         className="min-h-[100px]"
// //                         value={form.notes}
// //                         onChange={(e) =>
// //                             handleChange("notes", e.target.value)
// //                         }
// //                     />
// //                 </div>
// //             </div>
// //             {/* </CardContent>
// //       </Card> */}

// //         </div>
// //     );
// // }















// "use client";

// import { useState } from "react";
// import { Input } from "@workspace/ui/components/input";
// import { Textarea } from "@workspace/ui/components/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@workspace/ui/components/select";

// import {
//   VisitPurposeFormProps,
//   VisitPurposeData,
//   VisitPurposeErrors,
// } from "./VisitPurpose";

// import { validateField } from "./visitPurposeValidation";

// export function VisitPurposeForm({ data, setData, setDirty }: VisitPurposeFormProps) {
//   const [errors, setErrors] = useState<VisitPurposeErrors>({});

//   const handleChange = (field: keyof VisitPurposeData, value: string) => {
//     // Run validation
//     const errorMsg = validateField(field, value);

//     setErrors((prev) => ({
//       ...prev,
//       [field]: errorMsg || undefined,
//     }));

//     // Update parent
//     setData((prev) => ({ ...prev, [field]: value }));

//     setDirty(true);
//   };

//   const options = ["Minutes", "Hours", "Days", "Weeks", "Months", "Sudden", "Gradual"];

//   return (
//     <div className="flex flex-col gap-6">
//       {/* Chief Complaint */}
//       <div className="flex flex-col gap-2">
//         <label className="font-medium text-sm">Chief Complaint</label>

//         <Input
//           value={data.chiefComplaint}
//           onChange={(e) => handleChange("chiefComplaint", e.target.value)}
//         />

//         {errors.chiefComplaint && (
//           <span className="text-red-500 text-xs">{errors.chiefComplaint}</span>
//         )}
//       </div>

//       {/* History */}
//       <div className="flex flex-col gap-2">
//         <label className="font-medium text-sm">History of Present Illness</label>

//         <Textarea
//           value={data.history}
//           onChange={(e) => handleChange("history", e.target.value)}
//           className="min-h-[120px]"
//         />

//         {errors.history && (
//           <span className="text-red-500 text-xs">{errors.history}</span>
//         )}
//       </div>

//       {/* Select fields */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {(["onset", "duration", "severity"] as (keyof VisitPurposeData)[]).map((key) => (
//           <div key={key} className="flex flex-col gap-2">
//             <label className="font-medium text-sm">
//               {key.charAt(0).toUpperCase() + key.slice(1)}
//             </label>

//             <Select
//               value={data[key]}
//               onValueChange={(v) => handleChange(key, v)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select" />
//               </SelectTrigger>
//               <SelectContent>
//                 {options.map((opt) => (
//                   <SelectItem key={opt} value={opt}>
//                     {opt}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         ))}
//       </div>

//       {/* Notes */}
//       <div className="flex flex-col gap-2">
//         <label className="font-medium text-sm">Additional Notes</label>

//         <Textarea
//           value={data.notes}
//           onChange={(e) => handleChange("notes", e.target.value)}
//         />

//         {errors.notes && (
//           <span className="text-red-500 text-xs">{errors.notes}</span>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";

import {
  VisitPurposeFormProps,
  VisitPurposeData,
  VisitPurposeErrors,
} from "./VisitPurpose";

import { validateField } from "./visitPurposeValidation";
import { useVisitPurposeByVisitIdNurse } from "../_hooks/useVisitPurpose";
import { useParams } from "next/navigation";
import { VisitPurposeFormDetailsSkeleton } from "./VisitPurposeFormDetailsSkeleton";
import { RecordedMeta } from "../../common/recorded-meta";

// export function VisitPurposeForm({ data, setData, setDirty }: VisitPurposeFormProps) {
// const [errors, setErrors] = useState<VisitPurposeErrors>({});

// // SAFETY fallback – prevents undefined errors
// const safeData: VisitPurposeData = {
//   chiefComplaint: data?.chiefComplaint ?? "",
//   history: data?.history ?? "",
//   onset: data?.onset ?? "",
//   duration: data?.duration ?? "",
//   severity: data?.severity ?? "",
//   additional_notes: data?.additional_notes ?? "",
// };

// const handleChange = (field: keyof VisitPurposeData, value: string) => {
//   const errorMsg = validateField(field, value);

//   setErrors((prev) => ({
//     ...prev,
//     [field]: errorMsg || undefined,
//   }));

//   setData((prev) => ({
//     ...safeData,     // prevents merging with undefined
//     ...prev,
//     [field]: value,
//   }));

//   setDirty(true);
// };

// const options = ["Minutes", "Hours", "Days", "Weeks", "Months", "Sudden", "Gradual"];
export function VisitPurposeForm() {
  const { id: visitId } = useParams() as { id: string };

  // Reusable components
  function InfoRow({ label, value }: { label: string; value: string }) {
    return (
      <div className="bg-white p-4 rounded-lg border">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    );
  }

  function InfoBox({ label, value }: { label: string; value: string }) {
    return (
      <div className="bg-white p-4 rounded-lg border">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm leading-relaxed">{value}</p>
      </div>
    );
  }

  // return (
  //   <div className="flex flex-col gap-6">

  //     {/* Chief Complaint */}
  //     <div className="flex flex-col gap-2">
  //       <label className="font-medium text-sm">Chief Complaint</label>
  //       <Input
  //         value={safeData.chiefComplaint}
  //         onChange={(e) => handleChange("chiefComplaint", e.target.value)}
  //         placeholder="Enter Chief Complaint"
  //       />
  //       {errors.chiefComplaint && (
  //         <span className="text-red-500 text-xs">{errors.chiefComplaint}</span>
  //       )}
  //     </div>

  //     {/* History */}
  //     <div className="flex flex-col gap-2">
  //       <label className="font-medium text-sm">History of Present Illness</label>
  //       <Textarea
  //         value={safeData.history}
  //         onChange={(e) => handleChange("history", e.target.value)}
  //         className="min-h-[120px]"
  //         placeholder="Enter History of Present Illness"
  //       />
  //       {errors.history && (
  //         <span className="text-red-500 text-xs">{errors.history}</span>
  //       )}
  //     </div>

  //     {/* Select fields */}
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //       {(["onset", "duration", "severity"] as (keyof VisitPurposeData)[]).map((key) => (
  //         <div key={key} className="flex flex-col gap-2">
  //           <label className="font-medium text-sm">
  //             {key.charAt(0).toUpperCase() + key.slice(1)}
  //           </label>

  //           <Select
  //             value={safeData[key]}
  //             onValueChange={(v) => handleChange(key, v)}
  //           >
  //             <SelectTrigger className="w-full"><SelectValue placeholder={`Select ${key}`} /></SelectTrigger>
  //             <SelectContent>
  //               {options.map((opt) => (
  //                 <SelectItem key={opt} value={opt}>{opt}</SelectItem>
  //               ))}
  //             </SelectContent>
  //           </Select>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Notes */}
  //     <div className="flex flex-col gap-2">
  //       <label className="font-medium text-sm">Additional Notes</label>
  //       <Textarea
  //         value={safeData.additional_notes}
  //         onChange={(e) => handleChange("additional_notes", e.target.value)}
  //         placeholder="Enter Additional Notes"
  //       />
  //       {errors.additional_notes && (
  //         <span className="text-red-500 text-xs">{errors.additional_notes}</span>
  //       )}
  //     </div>
  //   </div>
  // );
  const {
    data: visitPurpose,
    isLoading: purposeLoading,
  } = useVisitPurposeByVisitIdNurse(visitId);

  if (purposeLoading) return <VisitPurposeFormDetailsSkeleton />;

  // console.log(visitPurpose)

  return (
    <>
      {visitPurpose?.chief_complaint || visitPurpose?.onset || visitPurpose?.duration || visitPurpose?.severity || visitPurpose?.history_of_present_illness || visitPurpose?.additional_notes ? (


        <div className="">
          {visitPurpose?.createdBy?.name &&
            < div className="flex justify-end">
              <RecordedMeta
                createdByName={visitPurpose?.createdBy?.name || ""}
                createdAt={visitPurpose?.created_at || ""}
              />
            </div>
          }

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Chief Complaint" value={visitPurpose?.chief_complaint || ""} />

            <InfoRow label="Onset" value={visitPurpose?.onset || ""} />
            <InfoRow label="Duration" value={visitPurpose?.duration || ""} />
            <InfoRow label="Severity" value={visitPurpose?.severity || ""} />

            <div className="col-span-2">
              <InfoRow
                label="History of Present Illness"
                value={visitPurpose?.history_of_present_illness || ""}
              />
            </div>

            <div className="col-span-2">
              <InfoBox
                label="Additional Notes"
                value={visitPurpose?.additional_notes || "No notes added"}
              />
            </div>
          </div>
        </div >

      ) : (
        <p className="text-gray-600 italic text-center">
          Visit purpose not added.
        </p>
      )}
    </>
  )
}

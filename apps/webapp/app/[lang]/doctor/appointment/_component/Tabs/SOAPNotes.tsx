// // "use client"

// // import { useState } from "react"
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectContent,
// //   SelectItem,
// //   SelectValue,
// // } from "@workspace/ui/components/select"
// // import { SOAPCard } from "./soap/soapCard"
// // import { SOAP_TEMPLATES } from "./soap/soapTemplates"
// // import { SectionWrapper } from "./common/SectionWrapper"
// // import { SectionTitle } from "./common/SectionTitle"

// // export function SOAPNotes() {
// //   const [data, setData] = useState({
// //     subjective: "",
// //     objective: "",
// //     assessment: "",
// //     plan: "",
// //   })

// //   const [selectedCard, setSelectedCard] = useState("")
// //   const [selectedTemplate, setSelectedTemplate] = useState("")

// //   const templateKeys = Object.keys(SOAP_TEMPLATES) // ["general", "followup", ...]

// //   const applyTemplate = (templateKey: keyof typeof SOAP_TEMPLATES) => {
// //     setData(SOAP_TEMPLATES[templateKey])
// //     setSelectedTemplate(templateKey)
// //   }

// //   const hasTemplate = selectedTemplate !== ""


// //   return (
// //     <SectionWrapper
// //       header={
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <SectionTitle title="SOAP Notes" />
// //             <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full border border-green-200">
// //               ✓ Auto-saved
// //             </span>
// //           </div>

// //           {/* Right side: Select Template */}
// //           <Select value={selectedTemplate} onValueChange={applyTemplate}>
// //             <SelectTrigger className="w-[180px] h-9 rounded-lg border-gray-300 shadow-sm bg-white cursor-pointer">
// //               <SelectValue placeholder="Load Template" />
// //             </SelectTrigger>

// //             <SelectContent>
// //               {templateKeys.map((key) => (
// //                 <SelectItem key={key} value={key}>
// //                   {SOAP_TEMPLATES[key as keyof typeof SOAP_TEMPLATES].label}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //         </div>
// //       }
// //     >
// //       {hasTemplate ? (
// //         <div className="grid grid-cols-2 gap-4">
// //           <SOAPCard
// //             title="Subjective (Patient's Story)"
// //             text={data.subjective}
// //             selected={selectedCard === "subjective"}
// //             onClick={() => setSelectedCard("subjective")}
// //             onChange={(value: string) => setData({ ...data, subjective: value })}
// //           />

// //           <SOAPCard
// //             title="Objective (Clinical Findings)"
// //             text={data.objective}
// //             selected={selectedCard === "objective"}
// //             onClick={() => setSelectedCard("objective")}
// //             onChange={(value: string) => setData({ ...data, objective: value })}
// //           />

// //           <SOAPCard
// //             title="Assessment (Diagnosis)"
// //             text={data.assessment}
// //             selected={selectedCard === "assessment"}
// //             onClick={() => setSelectedCard("assessment")}
// //             onChange={(value: string) => setData({ ...data, assessment: value })}
// //           />

// //           <SOAPCard
// //             title="Plan (Treatment & Follow-up)"
// //             text={data.plan}
// //             selected={selectedCard === "plan"}
// //             onClick={() => setSelectedCard("plan")}
// //             onChange={(value: string) => setData({ ...data, plan: value })}
// //           />
// //         </div>
// //       ) : (
// //         <p className="text-gray-600 italic">
// //           Please select any one of the template.
// //         </p>
// //       )}
// //     </SectionWrapper>
// //   )
// // }

// "use client";

// import { useState } from "react";
// import { Button } from "@workspace/ui/components/button";
// import { SOAPCard } from "./soap/soapCard";
// import { SectionWrapper } from "./common/SectionWrapper";
// import { SectionTitle } from "./common/SectionTitle";
// import { SelectSoapTemplateModal } from "./soap/SelectSoapTemplateModal";
// import { ArrowDown, ChevronDown } from "lucide-react";

// export function SOAPNotes() {
//   const [data, setData] = useState({
//     subjective: "",
//     objective: "",
//     assessment: "",
//     plan: "",
//   });

//   const [selectedCard, setSelectedCard] = useState("");
//   const [showTemplateModal, setShowTemplateModal] = useState(false);

//   const applyTemplate = (template: any) => {
//     setData({
//       subjective: template.subjective ?? "",
//       objective: template.objective ?? "",
//       assessment: template.assessment ?? "",
//       plan: template.plan ?? "",
//     });
//   };

//   return (
//     <>
//       <SectionWrapper
//         header={
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <SectionTitle title="SOAP Notes" />
//               <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full border">
//                 ✓ Auto-saved
//               </span>
//             </div>

//             <Button
//               variant="outline"
//               size="sm"
//               className="text-gray-700 cursor-pointer"
//               onClick={() => setShowTemplateModal(true)}
//             >
//               Load Template <ChevronDown className="w-4 h-4"/>
//             </Button>
//           </div>
//         }
//       >
//         {data.subjective ||
//         data.objective ||
//         data.assessment ||
//         data.plan ? (
//           <div className="grid grid-cols-2 gap-4">
//             <SOAPCard
//               title="Subjective (Patient's Story)"
//               text={data.subjective}
//               selected={selectedCard === "subjective"}
//               onClick={() => setSelectedCard("subjective")}
//               onChange={(v) => setData({ ...data, subjective: v })}
//             />

//             <SOAPCard
//               title="Objective (Clinical Findings)"
//               text={data.objective}
//               selected={selectedCard === "objective"}
//               onClick={() => setSelectedCard("objective")}
//               onChange={(v) => setData({ ...data, objective: v })}
//             />

//             <SOAPCard
//               title="Assessment (Diagnosis)"
//               text={data.assessment}
//               selected={selectedCard === "assessment"}
//               onClick={() => setSelectedCard("assessment")}
//               onChange={(v) => setData({ ...data, assessment: v })}
//             />

//             <SOAPCard
//               title="Plan (Treatment & Follow-up)"
//               text={data.plan}
//               selected={selectedCard === "plan"}
//               onClick={() => setSelectedCard("plan")}
//               onChange={(v) => setData({ ...data, plan: v })}
//             />
//           </div>
//         ) : (
//           <p className="text-gray-600 italic">
//             Please select a template to start SOAP notes.
//           </p>
//         )}
//       </SectionWrapper>

//       <SelectSoapTemplateModal
//         open={showTemplateModal}
//         onClose={() => setShowTemplateModal(false)}
//         onSelect={applyTemplate}
//       />
//     </>
//   );
// }


"use client";

import { SOAPCard } from "./soap/soapCard";
import { SectionWrapper } from "./common/SectionWrapper";
import { SectionTitle } from "./common/SectionTitle";
import { SelectSoapTemplateModal } from "./soap/SelectSoapTemplateModal";
import { Button } from "@workspace/ui/components/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { SoapNoteData } from "./soap/SOAPNote";
import { SoapNotesHistory } from "./soap/SoapNotesHistory";

interface SOAPNotesProps {
  patientId: string,
  data: SoapNoteData;
  setData: (data: SoapNoteData | ((prev: SoapNoteData) => SoapNoteData)) => void;
  setDirty: (dirty: boolean) => void;
}

export function SOAPNotes({ patientId, data, setData, setDirty }: SOAPNotesProps) {
  const [selectedCard, setSelectedCard] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const applyTemplate = (template: any) => {
    setData({
      subjective: template.subjective ?? "",
      objective: template.objective ?? "",
      assessment: template.assessment ?? "",
      plan: template.plan ?? "",
    });
    setDirty(true);
  };

  const handleChange = (key: keyof SoapNoteData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };



  return (
    <>
      <SectionWrapper
        header={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SectionTitle title="SOAP Notes" />
              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full border">
                ✓ Auto-saved
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplateModal(true)}
            >
              Load Template <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        }
      >
        {data.subjective || data.objective || data.assessment || data.plan ? (
          <div className="grid grid-cols-2 gap-4">
            <SOAPCard
              title="Subjective (Patient's Story)"
              text={data.subjective}
              selected={selectedCard === "subjective"}
              onClick={() => setSelectedCard("subjective")}
              onChange={(v) => handleChange("subjective", v)}
            />

            <SOAPCard
              title="Objective (Clinical Findings)"
              text={data.objective}
              selected={selectedCard === "objective"}
              onClick={() => setSelectedCard("objective")}
              onChange={(v) => handleChange("objective", v)}
            />

            <SOAPCard
              title="Assessment (Diagnosis)"
              text={data.assessment}
              selected={selectedCard === "assessment"}
              onClick={() => setSelectedCard("assessment")}
              onChange={(v) => handleChange("assessment", v)}
            />

            <SOAPCard
              title="Plan (Treatment & Follow-up)"
              text={data.plan}
              selected={selectedCard === "plan"}
              onClick={() => setSelectedCard("plan")}
              onChange={(v) => handleChange("plan", v)}
            />
          </div>
        ) : (
          <p className="text-gray-600 italic">
            Please select a template to start SOAP notes.
          </p>
        )}
      </SectionWrapper>
      <SoapNotesHistory patientId={patientId} />
      <SelectSoapTemplateModal
        open={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSelect={applyTemplate}
      />
    </>
  );
}

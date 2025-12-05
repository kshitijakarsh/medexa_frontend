// "use client";

// import { useState } from "react";
// import {
//     Select,
//     SelectTrigger,
//     SelectContent,
//     SelectItem,
//     SelectValue,
// } from "@workspace/ui/components/select";
// import { SOAPCard } from "./soap/soapCard";
// import { SOAP_TEMPLATES } from "./soap/soapTemplates";

// export function SOAPNotes() {
//     const [data, setData] = useState({
//         subjective: "",
//         objective: "",
//         assessment: "",
//         plan: "",
//     });

//     const [selectedCard, setSelectedCard] = useState("");
//     const [selectedTemplate, setSelectedTemplate] = useState("");

//     const applyTemplate = (templateKey: string) => {
//         setData(SOAP_TEMPLATES[templateKey]);
//         setSelectedTemplate(templateKey);
//     };

//     const hasTemplate = selectedTemplate !== "";

//     return (
//         <div className="flex flex-col gap-4 w-full">

//             {/* HEADER */}
//             <div className="flex items-center justify-between border-b border-gray-200 py-3 px-3">
//                 <div className="flex items-center gap-3">
//                     <h2 className="text-xl font-semibold">SOAP Notes</h2>

//                     <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full border border-green-200">
//                         ✓ Auto-saved
//                     </span>
//                 </div>

//                 {/* TEMPLATE SELECT DROPDOWN */}
//                 <Select value={selectedTemplate} onValueChange={applyTemplate}>
//                     <SelectTrigger className="w-[160px] h-9 rounded-lg border-gray-300 shadow-sm bg-white cursor-pointer">
//                         <SelectValue placeholder="Load Template" />
//                     </SelectTrigger>

//                     <SelectContent>
//                         <SelectItem value="general">General</SelectItem>
//                         <SelectItem value="followup">Follow-up</SelectItem>
//                     </SelectContent>
//                 </Select>
//             </div>

//             {/* MAIN CONTENT */}
//             {hasTemplate ? (
//                 <div className="grid grid-cols-2 gap-4 px-3 pb-4">
//                     <SOAPCard
//                         title="Subjective (Patient's Story)"
//                         text={data.subjective}
//                         selected={selectedCard === "subjective"}
//                         onClick={() => setSelectedCard("subjective")}
//                     />

//                     <SOAPCard
//                         title="Objective (Clinical Findings)"
//                         text={data.objective}
//                         selected={selectedCard === "objective"}
//                         onClick={() => setSelectedCard("objective")}
//                     />

//                     <SOAPCard
//                         title="Assessment (Diagnosis)"
//                         text={data.assessment}
//                         selected={selectedCard === "assessment"}
//                         onClick={() => setSelectedCard("assessment")}
//                     />

//                     <SOAPCard
//                         title="Plan (Treatment & Follow-up)"
//                         text={data.plan}
//                         selected={selectedCard === "plan"}
//                         onClick={() => setSelectedCard("plan")}
//                     />
//                 </div>
//             ) : (
//                 <div className="px-3 py-6 text-gray-600 italic text-center">
//                     Please select any one of the template.
//                 </div>
//             )}
//         </div>
//     );
// }


// return (
//     <div className="flex flex-col gap-4 w-full">

//         {/* ===========================
//             DYNAMIC HEADER AREA
//         ============================ */}
//         <div className="flex items-center justify-between border-b border-gray-200 py-3 px-3">

//             {/* LEFT AREA: Title + Badges */}
//             <div className="flex items-center gap-3">

//                 {/* Dynamic title slot (SOAP Notes for now) */}
//                 <h2 className="text-xl font-semibold">
//                     SOAP Notes
//                 </h2>

//                 {/* Auto-saved badge */}
//                 <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full border border-green-200">
//                     ✓ Auto-saved
//                 </span>

//                 {/* You can easily add more badges/tags here later */}
//                 {/* Example:
//                     <Badge variant="blue">Draft</Badge>
//                     <Badge variant="yellow">Needs Review</Badge>
//                 */}
//             </div>

//             {/* ===========================
//                 TEMPLATE SELECT (DYNAMIC)
//             ============================ */}
//             <Select
//                 value={selectedTemplate}
//                 onValueChange={applyTemplate}
//             >
//                 <SelectTrigger className="w-[180px] h-9 rounded-lg border-gray-300 shadow-sm bg-white cursor-pointer">
//                     <SelectValue placeholder="Load Template" />
//                 </SelectTrigger>

//                 <SelectContent>
//                     {templateKeys.map((key) => (
//                         <SelectItem key={key} value={key}>
//                             {SOAP_TEMPLATES[key].label}
//                         </SelectItem>
//                     ))}
//                 </SelectContent>
//             </Select>
//         </div>

//         {/* ===========================
//             MAIN BODY
//         ============================ */}
//         {hasTemplate ? (
//             <div className="grid grid-cols-2 gap-4 px-3 pb-4">
//                 <SOAPCard
//                     title="Subjective (Patient's Story)"
//                     text={data.subjective}
//                     selected={selectedCard === "subjective"}
//                     onClick={() => setSelectedCard("subjective")}
//                 />

//                 <SOAPCard
//                     title="Objective (Clinical Findings)"
//                     text={data.objective}
//                     selected={selectedCard === "objective"}
//                     onClick={() => setSelectedCard("objective")}
//                 />

//                 <SOAPCard
//                     title="Assessment (Diagnosis)"
//                     text={data.assessment}
//                     selected={selectedCard === "assessment"}
//                     onClick={() => setSelectedCard("assessment")}
//                 />

//                 <SOAPCard
//                     title="Plan (Treatment & Follow-up)"
//                     text={data.plan}
//                     selected={selectedCard === "plan"}
//                     onClick={() => setSelectedCard("plan")}
//                 />
//             </div>
//         ) : (
//             <div className="px-3 py-6 text-gray-600 italic">
//                 Please select any one of the template.
//             </div>
//         )}
//     </div>
// );


"use client"

import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@workspace/ui/components/select"
import { SOAPCard } from "./soap/soapCard"
import { SOAP_TEMPLATES } from "./soap/soapTemplates"
import { SectionWrapper } from "./common/SectionWrapper"
import { SectionTitle } from "./common/SectionTitle"

export function SOAPNotes() {
  const [data, setData] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  })

  const [selectedCard, setSelectedCard] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const templateKeys = Object.keys(SOAP_TEMPLATES) // ["general", "followup", ...]

  const applyTemplate = (templateKey: keyof typeof SOAP_TEMPLATES) => {
    setData(SOAP_TEMPLATES[templateKey])
    setSelectedTemplate(templateKey)
  }

  const hasTemplate = selectedTemplate !== ""


  return (
    <SectionWrapper
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SectionTitle title="SOAP Notes" />
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full border border-green-200">
              ✓ Auto-saved
            </span>
          </div>

          {/* Right side: Select Template */}
          <Select value={selectedTemplate} onValueChange={applyTemplate}>
            <SelectTrigger className="w-[180px] h-9 rounded-lg border-gray-300 shadow-sm bg-white cursor-pointer">
              <SelectValue placeholder="Load Template" />
            </SelectTrigger>

            <SelectContent>
              {templateKeys.map((key) => (
                <SelectItem key={key} value={key}>
                  {SOAP_TEMPLATES[key as keyof typeof SOAP_TEMPLATES].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    >
      {hasTemplate ? (
        <div className="grid grid-cols-2 gap-4">
          <SOAPCard
            title="Subjective (Patient's Story)"
            text={data.subjective}
            selected={selectedCard === "subjective"}
            onClick={() => setSelectedCard("subjective")}
            onChange={(value: string) => setData({ ...data, subjective: value })}
          />

          <SOAPCard
            title="Objective (Clinical Findings)"
            text={data.objective}
            selected={selectedCard === "objective"}
            onClick={() => setSelectedCard("objective")}
            onChange={(value: string) => setData({ ...data, objective: value })}
          />

          <SOAPCard
            title="Assessment (Diagnosis)"
            text={data.assessment}
            selected={selectedCard === "assessment"}
            onClick={() => setSelectedCard("assessment")}
            onChange={(value: string) => setData({ ...data, assessment: value })}
          />

          <SOAPCard
            title="Plan (Treatment & Follow-up)"
            text={data.plan}
            selected={selectedCard === "plan"}
            onClick={() => setSelectedCard("plan")}
            onChange={(value: string) => setData({ ...data, plan: value })}
          />
        </div>
      ) : (
        <p className="text-gray-600 italic">
          Please select any one of the template.
        </p>
      )}
    </SectionWrapper>
  )
}

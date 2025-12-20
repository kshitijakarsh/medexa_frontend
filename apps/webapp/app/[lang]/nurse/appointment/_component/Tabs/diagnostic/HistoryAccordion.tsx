// "use client";

// import { useState } from "react";
// import { ChevronUp, ChevronDown } from "lucide-react";

// export function HistoryAccordion({
//   date,
//   recordedBy,
//   children,
// }: {
//   date: string;
//   recordedBy: string;
//   children: React.ReactNode;
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="bg-white rounded-xl p-4 border mt-6 shadow-sm">
//       {/* HEADER */}
//       <div
//         className="flex items-center justify-between cursor-pointer"
//         onClick={() => setOpen(!open)}
//       >
//         <div>
//           <p className="text-lg font-semibold">{date}</p>
//           <p className="text-gray-500 text-sm">{recordedBy}</p>
//         </div>

//         <button className="p-2 rounded-full hover:bg-gray-100">
//           {open ? (
//             <ChevronUp className="w-5 h-5" />
//           ) : (
//             <ChevronDown className="w-5 h-5" />
//           )}
//         </button>
//       </div>

//       {/* CONTENT */}
//       {open && <div className="mt-4">{children}</div>}
//     </div>
//   );
// }



"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@workspace/ui/components/accordion";

import { ChevronUp, ChevronDown } from "lucide-react";

export function HistoryAccordion({
  date,
  recordedBy,
  children,
}: {
  date: string;
  recordedBy: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-white rounded-xl border shadow-sm mt-6"
    >
      <AccordionItem value="history">
        {/* CUSTOM HEADER (AccordionTrigger) */}
        <AccordionTrigger
          className="
            flex items-center justify-between w-full px-4 py-4
            hover:no-underline
            [&>svg]:hidden
          "
        >
          <div className="text-left">
            <p className="text-lg font-semibold">{date}</p>
            <p className="text-gray-500 text-sm">{recordedBy}</p>
          </div>

          {/* Custom Chevron Icons */}
          {/* <div className="accordion-chevron ml-2">
            <ChevronDown className="h-5 w-5 accordion-down-icon" />
            <ChevronUp className="h-5 w-5 accordion-up-icon hidden" />
          </div> */}
        </AccordionTrigger>

        {/* CONTENT */}
        <AccordionContent className="px-4 pb-4 pt-2">
          <div className="mt-2">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

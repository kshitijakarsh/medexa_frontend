// // // // // export function StatusPill({ status }: { status: string }) {
// // // // //   const color =
// // // // //     status === "In progress"
// // // // //       ? "bg-blue-100 text-blue-600"
// // // // //       : status === "In Consultation"
// // // // //       ? "bg-blue-600 text-white"
// // // // //       : "bg-orange-100 text-orange-600";

// // // // //   return (
// // // // //     <span className={`px-3 py-1 text-xs rounded-full font-medium ${color}`}>
// // // // //       {status}
// // // // //     </span>
// // // // //   );
// // // // // }


// // // // // app/doctor-dashboard/components/ui/StatusPill.tsx
// // // // export function StatusPill({ status }: { status: string }) {
// // // //   const cls =
// // // //     status === "In progress"
// // // //       ? "bg-[#E6F3FF] text-[#2C8DF0] border border-[#CFE9FF]"
// // // //       : status === "In Consultation"
// // // //       ? "bg-[#0B84FF] text-white"
// // // //       : "bg-[#FFF0E0] text-[#F48C2B]";

// // // //   return (
// // // //     <span className={`px-3 py-1 text-xs rounded-full font-medium ${cls}`}>
// // // //       {status}
// // // //     </span>
// // // //   );
// // // // }



// // // "use client";

// // // interface StatusPillProps {
// // //   status: string;
// // //   className?: string;
// // // }

// // // export function StatusPill({ status, className = "" }: StatusPillProps) {
// // //   const variant =
// // //     status === "In progress"
// // //       ? "bg-[#E6F3FF] text-[#2C8DF0] border border-[#CFE9FF]"
// // //       : status === "In Consultation"
// // //       ? "bg-[#0B84FF] text-white"
// // //       : status === "Completed"
// // //       ? "bg-[#E7F8ED] text-[#0F9D58]"
// // //       : status === "Waiting" ? "bg-[#FF8D28] text-white" : "bg-[#FF8D28] text-white"; // default fallback

// // //   return (
// // //     <span
// // //       className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${variant} ${className}`}
// // //     >
// // //       {status}
// // //     </span>
// // //   );
// // // }


// // "use client";

// // interface StatusPillProps {
// //   status: string;
// //   className?: string;
// // }

// // // Normalizer → "In progress", "in-progress", " IN PROGRESS " → "Inprogress"
// // function normalizeStatus(status: string) {
// //   return status
// //     .trim()
// //     .toLowerCase()
// //     .replace(/[\s_-]+/g, "") // remove spaces/hyphens
// //     .replace(/^./, (c) => c.toUpperCase());
// // }

// // /**
// //  * UI-MATCHED STATUS STYLE MAP
// //  *
// //  * Soft (light) backgrounds:
// //  *  - In progress
// //  *  - Completed
// //  *
// //  * Solid backgrounds:
// //  *  - In Consultation
// //  *  - Waiting
// //  *  - Cancelled
// //  */
// // const statusStyles: Record<
// //   string,
// //   {
// //     bg: string;
// //     text: string;
// //     border?: string;
// //   }
// // > = {
// //   // ⭐ Light background + colored text + border
// //   Inprogress: {
// //     bg: "bg-[#E6F3FF]",
// //     text: "text-[#2C8DF0]",
// //     border: "border border-[#CFE9FF]",
// //   },

// //   // ⭐ Solid blue + white text
// //   Inconsultation: {
// //     bg: "bg-[#0B84FF]",
// //     text: "text-white",
// //   },

// //   // ⭐ Light green + dark green text
// //   Completed: {
// //     bg: "bg-[#E7F8ED]",
// //     text: "text-[#0F9D58]",
// //   },

// //   // ⭐ Solid orange pill
// //   Waiting: {
// //     bg: "bg-[#FF8D28]",
// //     text: "text-white",
// //   },

// //   // ⭐ Solid red pill (you can change)
// //   Cancelled: {
// //     bg: "bg-[#F03E3E]",
// //     text: "text-white",
// //   },
// // };

// // // Default fallback
// // const defaultStyle = {
// //   bg: "bg-gray-200",
// //   text: "text-gray-700",
// //   border: undefined
// // };

// // export function StatusPill({ status, className = "" }: StatusPillProps) {
// //   const key = normalizeStatus(status);
// //   const style = statusStyles[key] || defaultStyle;

// //   return (
// //     <span
// //       className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap 
// //         ${style.bg} ${style.text} ${style.border || ""} ${className}`}
// //     >
// //       {status}
// //     </span>
// //   );
// // }



// "use client";

// interface StatusPillProps {
//     status: string;
//     className?: string;
// }

// /* 
//   Normalizes status:
//   "In progress" → "Inprogress"
//   "in_progress" → "Inprogress"
//   " IN-PROGRESS " → "Inprogress"
// */
// function normalizeStatus(status: string) {
//     return status
//         .trim()
//         .toLowerCase()
//         .replace(/[\s_-]+/g, "") // remove spaces, "_" and "-"
//         .replace(/^./, (c) => c.toUpperCase());
// }

// /*
//   UI Style Guide — MATCHES YOUR SCREENSHOTS EXACTLY
// */
// const statusStyles: Record<
//     string,
//     {
//         bg: string;
//         text: string;
//         border?: string;
//     }
// > = {
//     // ⭐ Soft light blue — In Progress
//     Inprogress: {
//         bg: "bg-[#E6F3FF]",
//         text: "text-[#2C8DF0]",
//         border: "border border-[#CFE9FF]",
//     },

//     // ⭐ Solid blue — In Consultation
//     Inconsultation: {
//         bg: "bg-[#0B84FF]",
//         text: "text-white",
//     },

//     // ⭐ Solid purple (based on screenshot “Next” tag)
//     //   Next: {
//     //     bg: "bg-[#D7C0FF]",
//     //     text: "text-[#6A34D9]",
//     //   },

//     Next: {
//         bg: "bg-[#CB30E0]",
//         text: "text-white",
//     },

//     // ⭐ Solid orange — Waiting
//     Waiting: {
//         bg: "bg-[#FF8D28]",
//         text: "text-white",
//     },

//     // ⭐ Soft green — Completed
//     Completed: {
//         bg: "bg-[#E7F8ED]",
//         text: "text-[#0F9D58]",
//     },

//     // ⭐ Solid red — Cancelled
//     Cancelled: {
//         bg: "bg-[#F03E3E]",
//         text: "text-white",
//     },

//     // ⭐ Solid cyan — New (optional)
//     New: {
//         bg: "bg-[#CFF3FF]",
//         text: "text-[#0B84FF]",
//     },

//     // ⭐ Grey — Default Unknown
//     Unknown: {
//         bg: "bg-gray-300",
//         text: "text-gray-800",
//     },
// };

// /*
//   A clean fallback for ANY status not defined.
// */
// const fallbackStyle = {
//     bg: "bg-gray-200",
//     text: "text-gray-700",
//     border: undefined,
// };

// export function StatusPill({ status, className = "" }: StatusPillProps) {
//     const key = normalizeStatus(status);
//     const style = statusStyles[key] || fallbackStyle;

//     return (
//         <span
//             className={`
//         px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap 
//         ${style.bg} 
//         ${style.text} 
//         ${style.border || ""} 
//         ${className}
//       `}
//         >
//             {status}
//         </span>
//     );
// }



"use client";

interface StatusPillProps {
  status: string;
  className?: string;
}

/* ------------------------------------------------------
   1. Normalize raw backend status → Display label
   Examples:
   "pending" → "Pending"
   "in_progress" → "In Progress"
   "finished" → "Finished"
------------------------------------------------------ */
function normalizeStatus(status: string) {
  return status
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ") // replace "_" and "-" with space
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words
}

/* ------------------------------------------------------
   2. Convert display label to an internal lookup key
   "In Progress" → "InProgress"
   "Pending" → "Pending"
------------------------------------------------------ */
function statusKey(label: string) {
  return label.replace(/\s+/g, "");
}

/* ------------------------------------------------------
   3. UI Color Mapping
   Add your backend statuses: pending, in_progress, finished
------------------------------------------------------ */
const statusStyles: Record<
  string,
  { bg: string; text: string; border?: string }
> = {
  // Backend statuses
  Pending: {
    bg: "bg-[#FFF4D9]",
    text: "text-[#F4A100]",
  },

  InProgress: {
    bg: "bg-[#E6F3FF]",
    text: "text-[#2C8DF0]",
    border: "border border-[#CFE9FF]",
  },

  Preop: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border border-blue-200",
  },

  Intraop: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border border-orange-200",
  },

  Postop: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border border-emerald-200",
  },

  Finished: {
    bg: "bg-[#E7F8ED]",
    text: "text-[#0F9D58]",
  },

  Emergency: {
    bg: "bg-red-100",
    border: "border border-red-300",
    text: "text-red-600",

  },

  // Your previous statuses
  InConsultation: {
    bg: "bg-[#0B84FF]",
    text: "text-white",
  },

  Next: {
    bg: "bg-[#CB30E0]",
    text: "text-white",
  },

  Waiting: {
    bg: "bg-[#FF8D28]",
    text: "text-white",
  },

  Completed: {
    bg: "bg-[#E7F8ED]",
    text: "text-[#0F9D58]",
  },

  Cancelled: {
    bg: "bg-[#F03E3E]",
    text: "text-white",
  },

  New: {
    bg: "bg-[#CFF3FF]",
    text: "text-[#0B84FF]",
  },

  Unknown: {
    bg: "bg-gray-300",
    text: "text-gray-800",
  },
};

/* ------------------------------------------------------
   4. Fallback for unexpected/unsupported statuses
------------------------------------------------------ */
const fallbackStyle = {
  bg: "bg-gray-200",
  text: "text-gray-700",
  border: ""
};

/* ------------------------------------------------------
   5. Component
------------------------------------------------------ */
export function StatusPill({ status, className = "" }: StatusPillProps) {
  const label = normalizeStatus(status);   // e.g., "In Progress"
  const key = statusKey(label);            // e.g., "InProgress"
  // console.log(key)
  const style = statusStyles[key] || fallbackStyle;

  // return (
  //   <div
  //     className={`
  //       px-3 py-1 text-xs rounded-full font-medium text-center w-auto
  //       max-w-[120px]
  //       ${style.bg}
  //       ${style.text}
  //       ${style.border || ""}
  //       ${className}
  //     `} 
  //     // whitespace-nowrap
  //   >
  //     <span>{label}</span>
  //   </div>
  // );
  return (
    <div
      className={`
        inline-flex items-center justify-center
        px-3 py-1 text-xs rounded-full font-medium
        ${style.bg}
        ${style.text}
        ${style.border || ""}
        ${className}
      `}        //whitespace-nowrap 

    >
      {label}
    </div>
  );
}

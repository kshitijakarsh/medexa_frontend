// // // export function StatusPill({ status }: { status: string }) {
// // //   const color =
// // //     status === "In progress"
// // //       ? "bg-blue-100 text-blue-600"
// // //       : status === "In Consultation"
// // //       ? "bg-blue-600 text-white"
// // //       : "bg-orange-100 text-orange-600";

// // //   return (
// // //     <span className={`px-3 py-1 text-xs rounded-full font-medium ${color}`}>
// // //       {status}
// // //     </span>
// // //   );
// // // }


// // // app/doctor-dashboard/components/ui/StatusPill.tsx
// // export function StatusPill({ status }: { status: string }) {
// //   const cls =
// //     status === "In progress"
// //       ? "bg-[#E6F3FF] text-[#2C8DF0] border border-[#CFE9FF]"
// //       : status === "In Consultation"
// //       ? "bg-[#0B84FF] text-white"
// //       : "bg-[#FFF0E0] text-[#F48C2B]";

// //   return (
// //     <span className={`px-3 py-1 text-xs rounded-full font-medium ${cls}`}>
// //       {status}
// //     </span>
// //   );
// // }



// "use client";

// interface StatusPillProps {
//   status: string;
//   className?: string;
// }

// export function StatusPill({ status, className = "" }: StatusPillProps) {
//   const variant =
//     status === "In progress"
//       ? "bg-[#E6F3FF] text-[#2C8DF0] border border-[#CFE9FF]"
//       : status === "In Consultation"
//       ? "bg-[#0B84FF] text-white"
//       : status === "Completed"
//       ? "bg-[#E7F8ED] text-[#0F9D58]"
//       : status === "Waiting" ? "bg-[#FF8D28] text-white" : "bg-[#FF8D28] text-white"; // default fallback

//   return (
//     <span
//       className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${variant} ${className}`}
//     >
//       {status}
//     </span>
//   );
// }


"use client";

interface StatusPillProps {
  status: string;
  className?: string;
}

// Normalizer → "In progress", "in-progress", " IN PROGRESS " → "Inprogress"
function normalizeStatus(status: string) {
  return status
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "") // remove spaces/hyphens
    .replace(/^./, (c) => c.toUpperCase());
}

/**
 * UI-MATCHED STATUS STYLE MAP
 *
 * Soft (light) backgrounds:
 *  - In progress
 *  - Completed
 *
 * Solid backgrounds:
 *  - In Consultation
 *  - Waiting
 *  - Cancelled
 */
const statusStyles: Record<
  string,
  {
    bg: string;
    text: string;
    border?: string;
  }
> = {
  // ⭐ Light background + colored text + border
  Inprogress: {
    bg: "bg-[#E6F3FF]",
    text: "text-[#2C8DF0]",
    border: "border border-[#CFE9FF]",
  },

  // ⭐ Solid blue + white text
  Inconsultation: {
    bg: "bg-[#0B84FF]",
    text: "text-white",
  },

  // ⭐ Light green + dark green text
  Completed: {
    bg: "bg-[#E7F8ED]",
    text: "text-[#0F9D58]",
  },

  // ⭐ Solid orange pill
  Waiting: {
    bg: "bg-[#FF8D28]",
    text: "text-white",
  },

  // ⭐ Solid red pill (you can change)
  Cancelled: {
    bg: "bg-[#F03E3E]",
    text: "text-white",
  },
};

// Default fallback
const defaultStyle = {
  bg: "bg-gray-200",
  text: "text-gray-700",
  border: undefined
};

export function StatusPill({ status, className = "" }: StatusPillProps) {
  const key = normalizeStatus(status);
  const style = statusStyles[key] || defaultStyle;

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap 
        ${style.bg} ${style.text} ${style.border || ""} ${className}`}
    >
      {status}
    </span>
  );
}

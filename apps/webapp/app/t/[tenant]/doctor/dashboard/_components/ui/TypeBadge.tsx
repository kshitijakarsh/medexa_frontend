// // // // app/doctor-dashboard/components/ui/TypeBadge.tsx
// // // "use client";

// // // interface TypeBadgeProps {
// // //   type: string;
// // //   className?: string;
// // // }

// // // const typeColors: Record<string, string> = {
// // //   Emergency: "text-[#FF6B35]",        // orange
// // //   Critical: "text-[#D92D20]",         // red
// // //   Urgent: "text-[#F79009]",           // amber
// // //   Normal: "text-[#475467]",           // gray
// // //   FollowUp: "text-[#CF9646]",         // blue
// // // };

// // // export function TypeBadge({ type, className = "" }: TypeBadgeProps) {
// // //   const colorClass = typeColors[type.trim()] || "text-[#475467]"; // default gray

// // //   return (
// // //     <div className={`text-xs font-medium ${colorClass} ${className}`}>
// // //       {type}
// // //     </div>
// // //   );
// // // }


// // "use client";

// // interface TypeBadgeProps {
// //   type: string;
// //   className?: string;
// // }

// // const typeColors: Record<string, string> = {
// //   Emergency: "text-[#FF6B35]",
// //   Critical: "text-[#D92D20]",
// //   Urgent: "text-[#F79009]",
// //   Normal: "text-[#475467]",
// //   FollowUp: "text-[#CF9646]",
// // };

// // // Convert anything like "Follow Up", "follow up", "FOLLOW_UP" → "FollowUp"
// // function normalizeType(type: string) {
// //   return type
// //     .trim()
// //     .toLowerCase()
// //     .replace(/[\s_-]+/g, "")        // remove spaces, underscores, hyphens
// //     .replace(/^./, (c) => c.toUpperCase()); // capitalize first letter
// // }

// // export function TypeBadge({ type, className = "" }: TypeBadgeProps) {
// //   const normalized = normalizeType(type);
// //   const colorClass = typeColors[normalized] || "text-[#475467]";
// //     console.log(normalized)
// //   return (
// //     <div className={`text-xs font-medium ${colorClass} ${className}`}>
// //       {type}
// //     </div>
// //   );
// // }


// "use client";

// interface TypeBadgeProps {
//   type: string;
//   className?: string;
// }

// const typeColors: Record<string, string> = {
//   Emergency: "text-[#FF6B35]",
//   Critical: "text-[#D92D20]",
//   Urgent: "text-[#F79009]",
//   Normal: "text-[#475467]",
//   FollowUp: "text-[#CF9646]",
// };

// function normalizeType(type: string) {
//   return type
//     .trim()
//     // .toLowerCase()
//     .replace(/[\s_-]+/g, "")     // removes: "follow up", "follow_up", "follow-up"
//     // .replace(/^./, (c) => c.toUpperCase()); // F
// }

// export function TypeBadge({ type, className = "" }: TypeBadgeProps) {
//   const normalized = normalizeType(type);

//   const colorClass = typeColors[normalized] || "text-[#475467]";

//   return (
//     <div className={`text-xs font-medium ${colorClass} ${className}`}>
//       {type}
//     </div>
//   );
// }



"use client";

interface TypeBadgeProps {
  type: string;
  className?: string;
}

/*
  Normalizes values like:
  "Follow Up" → "FollowUp"
  "follow up" → "FollowUp"
  "follow_up" → "FollowUp"
  "VIP" → "VIP"
*/
function normalizeType(type: string) {
  if (!type) return "";
  return type
    .trim()
    .replace(/[\s_-]+/g, "") // remove spaces, "_" and "-"
    .replace(/^./, (c) => c.toUpperCase());
}

/*
  Color mapping for types
*/
const typeColors: Record<string, string> = {
  Emergency: "text-[#FF6B35]",
  Critical: "text-[#D92D20]",
  Urgent: "text-[#F79009]",
  Normal: "text-[#475467]",
  FollowUp: "text-[#CF9646]",
  VIP: "text-[#0B84FF]",
  Standard: "text-[#475467]",
  New: "text-[#17B26D]",    // green
};

export function TypeBadge({ type, className = "" }: TypeBadgeProps) {
  const normalized = normalizeType(type);
  const colorClass = typeColors[normalized] || "text-[#475467]";

  return (
    <div className={`text-xs font-medium ${colorClass} ${className}`}>
      {type}
    </div>
  );
}

// "use client";

// import { ReactNode } from "react";

// export function CardBlock({
//   children,
//   className = "",
//   onClick =
// }: {
//   children: ReactNode;
//   className?: string;
//   onClick:void
// }) {
//   return (
//     <div
//       className={`
//         bg-white 
//         rounded-xl 
//         border 
//         border-[#E6E6E6] 
//         shadow-[0_1px_3px_rgba(0,0,0,0.05)]
//         ${className}
//       `}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// }


"use client";

import { ReactNode, MouseEventHandler } from "react";

interface CardBlockProps {
  children: ReactNode;
  className?: string;
  // onClick?: MouseEventHandler<HTMLDivElement>; // optional
  onClick?: () => void;
}

export function CardBlock({
  children,
  className = "",
  onClick,
}: CardBlockProps) {
  return (
    <div
      className={`
        bg-white 
        rounded-xl 
        border 
        border-[#E6E6E6] 
        shadow-[0_1px_3px_rgba(0,0,0,0.05)]
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// "use client";

// import { Button } from "@workspace/ui/components/button";
// import { ReactNode } from "react";
// import { useDictionary } from "@/i18n/use-dictionary";

// export function PrimaryButton({
//     label = useDictionary().common.save,
//     loadingName = "Saving...",
//     onClick,
//     loading = false,
//     disabled = false,
//     className = "",
//     type = "button",
//     icon
// }: {
//     label?: string;
//     loadingName?: string;
//     onClick?: () => void;
//     loading?: boolean;
//     disabled?: boolean;
//     className?: string;
//     type?: "button" | "submit" | "reset";
//     icon?: ReactNode;

// }) {
//     return (
//         <Button
//             type={type}
//             onClick={onClick}
//             disabled={disabled || loading}
//             variant="default"
//             className={`bg-green-600 hover:bg-green-700 text-white shadow-sm cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
//         >
//             {icon} {loading ? loadingName : label}
//         </Button>
//     );
// }

"use client";

import { Button } from "@workspace/ui/components/button";
import { ReactNode } from "react";
import { useDictionary } from "@/i18n/use-dictionary";

interface PrimaryButtonProps {
  label?: string;
  loadingName?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function PrimaryButton({
  label,
  loadingName,
  onClick,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  icon,
}: PrimaryButtonProps) {
  const dict = useDictionary();

  const finalLabel = label ?? dict.common.save;
  const finalLoadingName = loadingName ?? dict.common.loading;

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant="default"
      className={`bg-green-600 hover:bg-green-700 text-white shadow-sm cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {icon} {loading ? finalLoadingName : finalLabel}
    </Button>
  );
}

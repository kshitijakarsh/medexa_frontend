// "use client";

// import { Button } from "@workspace/ui/components/button";
// import { useDictionary } from "@/i18n/use-dictionary";

// export function CancelButton({
//   label = useDictionary().common.cancel,
//   onClick,
//   disabled = false,
//   className = "",
// }: {
//   label?: string;
//   onClick?: () => void;
//   disabled?: boolean;
//   className?: string;
// }) {
//   return (
//     <Button
//       type="button"
//       variant="outline"
//       disabled={disabled}
//       onClick={onClick}
//       className={`border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${className}`}
//     >
//       {label}
//     </Button>
//   );
// }

"use client";

import { Button } from "@workspace/ui/components/button";
import { useDictionary } from "@/i18n/use-dictionary";

export function CancelButton({
  label,
  onClick,
  disabled = false,
  className = "",
}: {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const dict = useDictionary();

  const finalLabel = label ?? dict.common.cancel;

  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={`border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${className}`}
    >
      {finalLabel}
    </Button>
  );
}

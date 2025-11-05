// "use client";

// import { Switch } from "@workspace/ui/components/switch";
// import React from "react";

// interface StatusSwitchProps {
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   className?: string;
// }

// export function StatusSwitch({
//   checked,
//   onChange,
//   className = "",
// }: StatusSwitchProps) {
//   return (
//     <Switch
//       checked={checked}
//       onCheckedChange={onChange}
//       className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 cursor-pointer ${className}`}
//     />
//   );
// }

"use client";

import * as React from "react";
import { Switch } from "@workspace/ui/components/switch";

interface StatusSwitchProps
  extends React.ComponentPropsWithoutRef<typeof Switch> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const StatusSwitch = React.forwardRef<
  React.ElementRef<typeof Switch>,
  StatusSwitchProps
>(({ checked, onCheckedChange, className = "", ...props }, ref) => {
  return (
    <Switch
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 cursor-pointer ${className}`}
      {...props}
    />
  );
});

StatusSwitch.displayName = "StatusSwitch";

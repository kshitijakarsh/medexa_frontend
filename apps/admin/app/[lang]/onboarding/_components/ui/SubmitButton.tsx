// // components/onboard-hospital/ui/SubmitButton.tsx
// "use client";
// import { Button } from "@workspace/ui/components/button";
// import { Loader2, SquarePlus } from "lucide-react";

// interface SubmitButtonProps {
//   loading: boolean;
//   isEdit?: boolean;
// }

// export const SubmitButton = ({ loading, isEdit }: SubmitButtonProps) => (
  
//     <Button
//       type="submit"
//       disabled={loading}
//       className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 flex items-center gap-2"
//     >
//       {loading ? (
//         <>
//           <Loader2 className="animate-spin h-4 w-4" /> Submitting...
//         </>
//       ) : (
//         <>
//           {isEdit ? "Update Hospital" : "Onboard New"}
//           <span className="p-2 bg-[#50C786] rounded-full">
//             <SquarePlus className="size-4" />
//           </span>
//         </>
//       )}
//     </Button>
// );


"use client";
import { Button } from "@workspace/ui/components/button";
import { Loader2, SquarePlus } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
  isEdit?: boolean;
  label?: string;
  loadingLabel?: string;
}

export const SubmitButton = ({
  loading,
  isEdit,
  label,
  loadingLabel,
}: SubmitButtonProps) => {
  const resolvedLabel = label ?? (isEdit ? "Update Hospital" : "Onboard New")
  const resolvedLoadingLabel = loadingLabel ?? "Submitting..."

  return (
    <Button
      type="submit"
      disabled={loading}
      className="
        relative flex items-center justify-center gap-3
        bg-gradient-to-r from-green-500 to-green-600
        hover:from-green-600 hover:to-green-700
        text-white font-semibold
        rounded-full px-6 py-6
        shadow-md
        transition-all duration-300 transform
        cursor-pointer
        hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 text-white" />
          <span className="text-sm">{resolvedLoadingLabel}</span>
        </>
      ) : (
        <span className="flex items-center gap-2">
          {resolvedLabel}
          <span className="p-2 bg-white/20 rounded-full">
            <SquarePlus className="size-4 text-white" />
          </span>
        </span>
      )}
    </Button>
  )
}

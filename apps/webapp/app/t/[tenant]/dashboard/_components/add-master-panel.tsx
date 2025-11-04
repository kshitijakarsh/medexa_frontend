// "use client"

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@workspace/ui/components/popover"
// import { Button } from "@workspace/ui/components/button"
// import { Plus, PlusCircle } from "lucide-react"

// export function AddMasterPanel() {
//   const options = ["Bed", "Bed type", "Ward", "Floor"]

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="success"
//           className="bg-transperent hover:bg-green-700 text-green-700 hover:text-white font-medium px-4 py-2 rounded-full flex items-center gap-1"
//         >
//           Add <PlusCircle className="h-4 w-4" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent
//         side="bottom"
//         align="start"
//         className="w-48 p-2 bg-white shadow-lg rounded-xl border"
//       >
//         <div className="space-y-2">
//           {options.map((item, i) => (
//             <button
//               key={i}
//               className={`w-full flex items-center justify-between text-sm font-medium rounded-lg px-3 py-2 ${
//                 i === 0
//                   ? "bg-green-500 text-white hover:bg-green-600"
//                   : "bg-green-50 text-gray-800 hover:bg-green-100"
//               } transition`}
//             >
//               {item}
//               <Plus className="h-4 w-4" />
//             </button>
//           ))}
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }


"use client"

import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Button } from "@workspace/ui/components/button"
import { Plus, PlusCircle } from "lucide-react"

export function AddMasterPanel() {
  const options = ["Bed", "Bed type", "Ward", "Floor"]
  const [active, setActive] = useState<string | null>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="border border-none text-green-700 hover:bg-green-600 hover:text-white font-medium px-4 py-2 rounded-full flex items-center gap-1 transition"
        >
          Add <PlusCircle className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="w-48 p-2 bg-white shadow-lg rounded-xl border border-gray-200"
      >
        <div className="space-y-2">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full flex items-center justify-between text-sm font-medium rounded-lg px-3 py-2 transition cursor-pointer ${
                active === item
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-green-50 text-gray-800 hover:bg-green-100"
              }`}
            >
              {item}
              <Plus className="h-4 w-4" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

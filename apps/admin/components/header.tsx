// // "use client";

// // import { logoutCognitoUser } from "@/lib/api";
// // import { SidebarTrigger } from "@workspace/ui/components/sidebar"
// // import { LogOutIcon } from "lucide-react"

// // export const Header = () => {

// //   // const handleLogout = () => {
// //   //   logoutCognitoUser();
// //   //   window.location.href = "/login"; // full page reload
// //   // };

// //   return (
// //     <div className="h-14 w-full px-4 flex items-center justify-between border-b bg-white">
// //       <SidebarTrigger size="icon-lg" />
// //       {/* <button
// //         onClick={handleLogout}
// //         className="px-4 py-2 bg-red-500 text-white rounded"
// //       >
// //         <LogOutIcon onClick={handleLogout} className="h-4 w-4" />
// //       </button> */}
// //     </div>
// //   )
// // }

// "use client";

// import { SidebarTrigger } from "@workspace/ui/components/sidebar";
// import { ChevronDown } from "lucide-react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { useState } from "react";

// export const Header = () => {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   // Detect current language from URL
//   const currentLang = pathname.startsWith("/ar") ? "ar" : "en";

//   // Remove /en or /ar from current path
//   const basePath = pathname.replace(/^\/(en|ar)/, "");

//   return (
//     <div className="h-14 w-full px-4 flex items-center justify-between border-b bg-white">
//       <SidebarTrigger size="icon-lg" />

//       {/* Language Dropdown */}
//       <div className="relative">
//         <button
//           onClick={() => setOpen((v) => !v)}
//           className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
//         >
//           {currentLang === "ar" ? "AR" : "EN"}
//           <ChevronDown className="h-4 w-4" />
//         </button>

//         {open && (
//           <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-50">
//             <Link
//               href={`/en${basePath}`}
//               className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
//                 currentLang === "en" ? "font-semibold" : ""
//               }`}
//               onClick={() => setOpen(false)}
//             >
//               English
//             </Link>

//             <Link
//               href={`/ar${basePath}`}
//               className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
//                 currentLang === "ar" ? "font-semibold" : ""
//               }`}
//               onClick={() => setOpen(false)}
//             >
//               العربية
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

"use client";

import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Detect current language
  const currentLang = pathname.startsWith("/ar") ? "ar" : "en";

  // Remove locale prefix
  const basePath = pathname.replace(/^\/(en|ar)/, "");

  // Preserve query params
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";

  return (
    <div className="h-14 w-full px-4 flex items-center justify-between border-b bg-white">
      <SidebarTrigger size="icon-lg" />

      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
        >
          {currentLang === "ar" ? "AR" : "EN"}
          <ChevronDown className="h-4 w-4" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-50">
            <Link
              href={`/en${basePath}${suffix}`}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                currentLang === "en" ? "font-semibold" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              English
            </Link>

            <Link
              href={`/ar${basePath}${suffix}`}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                currentLang === "ar" ? "font-semibold" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              العربية
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

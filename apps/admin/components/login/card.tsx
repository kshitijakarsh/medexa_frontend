// // import Image from "next/image";
// // import { LoginForm } from "./LoginForm";
// // import { LOGOS } from "@/lib/logos";
// // import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

// // export function LoginCard() {
// //   return (
// //     <Card className="w-full max-w-md shadow-2xl rounded-2xl">
// //       <CardHeader>
// //         <div className="flex justify-center mb-4">
// //           <Image src={LOGOS.main} alt="MedExa Logo" width={140} height={40} />
// //         </div>
// //         <CardTitle className="text-center text-xl font-semibold">
// //           Login
// //         </CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <LoginForm />
// //       </CardContent>
// //     </Card>
// //   );
// // }
// "use client";

// import Image from "next/image";
// import { Card, CardContent } from "@workspace/ui/components/card";
// import { LoginForm } from "./LoginForm";
// import { LOGOS } from "@/lib/logos";

// export function LoginCard() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
//       <div className="relative w-full max-w-sm">
//         {/* Top Logo Section */}
//         <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#023D5F] rounded-t-2xl px-8 py-3 shadow-md">
//           <div className="flex items-center justify-center">
//             <Image
//               src={LOGOS.main}
//               alt="MedExa Logo"
//               width={160}
//               height={40}
//               priority
//             />
//           </div>
//         </div>

//         {/* Login Card */}
//         <Card className="pt-16 rounded-3xl shadow-2xl border-none bg-white">
//           <CardContent className="px-8 pb-8">
//             <LoginForm />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { Card, CardContent } from "@workspace/ui/components/card";
import { LoginForm } from "./form";
import { LOGOS } from "@/lib/logos";

export function LoginCard() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Decorative Shape */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[260px] bg-green-500 rounded-b-[60px] shadow-lg" /> */}

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Top Logo Panel */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#023D5F] rounded-t-2xl px-8 py-3 shadow-md">
          <div className="flex items-center justify-center">
            <Image
              src={LOGOS.main}
              alt="MedExa Logo"
              width={160}
              height={40}
              priority
            />
          </div>
        </div>

        {/* White Login Card */}
        <Card className="pt-16 rounded-3xl shadow-2xl border-none bg-white">
          <CardContent className="px-8 pb-8">
            <LoginForm />
          </CardContent>
        </Card>
      </div>

      {/* Subtle bottom blur for depth */}
      {/* <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-blue-100 to-transparent" /> */}
    </div>
  );
}

// import Image from "next/image";
// import { IMAGES } from "@/lib/images";
// import { LoginCard } from "./LoginCard";

// export function LoginLayout() {
//   return (
//     <div className=" w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-900 to-blue-700">
//       {/* Left Section */}
//       <div className="flex-1 flex flex-col items-center justify-center text-white p-8 relative">
//         <div className="relative w-full max-w-md">
//           <Image
//             src={IMAGES.illustration}
//             alt="MedExa Illustration"
//             width={400}
//             height={400}
//             className="mx-auto object-contain"
//           />
//         </div>
//         <div className="text-center mt-6">
//           <div className="text-3xl font-bold">MedExa</div>
//           <p className="text-sm mt-2 opacity-90">
//             Trusted Digital Healthcare Ecosystem
//           </p>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex-1 flex items-center justify-center p-6">
//         <LoginCard />
//       </div>
//     </div>
//   );
// }

import Image from "next/image"
import { IMAGES } from "@/lib/images"
import { LoginCard } from "./card"

export function LoginLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Background Illustration */}
      <Image
        src={IMAGES.illustration}
        alt="MedExa Illustration"
        fill
        className="object-cover object-center -z-10" // behind content
      />
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 opacity-80 -z-10"></div>

      {/* Left Section
      <div className="flex-1 relative flex flex-col items-center justify-center text-white p-8 overflow-hidden">

         Content 
        <div className="relative text-center">
          <div className="text-3xl font-bold">MedExa</div>
          <p className="text-sm mt-2 opacity-90">
            Trusted Digital Healthcare Ecosystem
          </p>
        </div>
      </div> */}

      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-white p-8 relative">
        <div className="relative w-full max-w-md">
          <Image
            src={IMAGES.leftLllustration}
            alt="MedExa Illustration"
            width={400}
            height={400}
            className="mx-auto object-contain"
          />
        </div>
        {/* <div className="text-center mt-6">
          <div className="text-3xl font-bold">MedExa</div>
          <p className="text-sm mt-2 opacity-90">
            Trusted Digital Healthcare Ecosystem
          </p>
        </div> */}
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginCard />
      </div>
    </div>
  )
}

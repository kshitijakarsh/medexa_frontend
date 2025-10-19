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
import { LOGOS } from "@/lib/logos"

export default function LoginLayout() {
  // console.log(IMAGES.illustrationLatest)
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Background Illustration */}
      <Image
        src={IMAGES.illustrationLatest}
        alt="MedExa Illustration"
        fill
        className="object-cover object-center -z-10" // behind content
      />
      {/* Blue overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-900 opacity-80 -z-10"></div> */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#001A4D,#001A4D)] opacity-90 -z-10"></div> */}
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
          {/* <Image
            src={IMAGES.leftLllustration}
            alt="MedExa Illustration"
            width={400}
            height={400}
            className="mx-auto object-contain"
          /> */}

          {/* <div className="flex justify-center">
            <Image
              src={LOGOS.small}
              alt="MedExa logo small"
              width={260}
              height={260}
              className="" // behind content
            />
            <div className="background: linear-gradient(180deg, rgba(104, 155, 103, 0) 50.83%, #689B67 100%);  w-[422px] 
">

              <Image
                src={IMAGES.leftIllustratoinHospitalPeople}
                alt="MedExa logo small"
                width={422}
                height={275}
                className="" // behind content
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center w-[422px] h-[155px] bg-[#026BB3] rounded-2xl border-t-1 border-[#4DA0D9]">
            <div className="h-0">
              <div className="relative -top-[70px] ">

                <Image
                  src={IMAGES.leftIllustrationHospitalIocn}
                  alt="MedExa logo small"
                  width={80}
                  height={80}
                  className="" // behind content
                />
              </div>
            </div>
            <h4 className="text-3xl font-semibold pt-4">MedExa</h4>
            <p className="text-lg max-w-8/12 font-medium">Trusted Digital Healthcare Ecosystem</p>
          </div> */}

          <div className="flex flex-col items-center justify-center relative">
            {/* Top Section — Layered Illustration */}
            <div className="relative w-[422px] h-[275px] flex justify-center items-center z-0 overflow-visible rounded-t-2xl shadow-md">
              {/* Small logo (back layer, more visible) */}
              <Image
                src={LOGOS.small}
                alt="MedExa logo small"
                fill
                className="object-contain opacity-100 -translate-y-15"
              />

              {/* Gradient overlay — smoother fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#689B67]/30 to-[#689B67]/90"></div>

              {/* Front illustration (people/hospital) */}
              <Image
                src={IMAGES.leftIllustratoinHospitalPeople}
                alt="MedExa hospital illustration"
                fill
                className="object-contain relative z-10"
              />
            </div>

            {/* Bottom Card Section (blue box overlaps top) */}
            <div className="relative flex flex-col justify-center items-center text-center w-[422px] h-[155px] bg-[#026BB3] rounded-b-2xl border-t border-[#4DA0D9] -mt-[20px] z-10">
              {/* Floating hospital icon */}
              <div className="absolute -top-[40px] p-2 bg-[#026BB3] rounded-full">
                <Image
                  src={IMAGES.leftIllustrationHospitalIocn}
                  alt="MedExa hospital icon"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              {/* Text content */}
              <h4 className="text-3xl font-semibold pt-10">MedExa</h4>
              <p className="text-lg font-medium text-white/90 max-w-[70%]">
                Trusted Digital Healthcare Ecosystem
              </p>
            </div>
          </div>
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

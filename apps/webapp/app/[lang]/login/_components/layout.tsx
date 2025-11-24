import Image from "next/image"
import { IMAGES } from "@/lib/images"
import { LoginCard } from "./card"
import { LOGOS } from "@/lib/logos"

export default function LoginLayout() {
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

      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-white p-8 relative">
        <div className="relative w-full max-w-md">
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
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginCard />
      </div>
    </div>
  )
}

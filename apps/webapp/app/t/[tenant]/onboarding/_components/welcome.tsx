"use client"

import { Mail, MapPin, Phone, UserCircle } from "lucide-react"
import { HandIcon, HospitalBuildingIcon } from "../../assets/icons"
import Button from "@/components/ui/button"

interface WelcomeProps {
  onNext?: () => void
}

const Welcome = ({ onNext }: WelcomeProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-2.5">
        <HandIcon />
        <h1 className="text-2xl font-semibold">
          Welcome to <span className="text-blue-500">MedExe</span>
        </h1>
        <p className="">
          You're logging in for the first time as a Hospital Administrator.
          Here's your hospital's registered information - please review and
          confirm before continuing.
        </p>
      </div>
      <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HospitalBuildingIcon />
            <div>
              <h3 className="text-sm">Hospital Name</h3>
              <h1 className="text-lg font-semibold">Hamad Medical Center</h1>
            </div>
          </div>
          <div className="rounded-sm bg-accent w-20 h-20"></div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-start gap-2">
            <Phone strokeWidth={1.5} size={20} className="text-green-500" />
            <div>
              <h3 className="text-sm">Contact No.</h3>
              <h1 className="text-base font-medium">+971 50 123 4567</h1>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail strokeWidth={1.5} size={20} className="text-green-500" />
            <div>
              <h3 className="text-sm">Email</h3>
              <h1 className="text-base font-medium">info@hamad.qa</h1>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin strokeWidth={1.5} size={20} className="text-green-500" />
            <div>
              <h3 className="text-sm">Address</h3>
              <h1 className="text-base font-medium">Doha, Qatar</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Details */}
      <h1 className="text-base ml-2 font-semibold mt-8">
        Primary Admin Account
      </h1>
      <div className="mt-4 bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <UserCircle
              strokeWidth={1.5}
              size={20}
              className="text-green-500"
            />
            <div>
              <h3 className="text-sm">Admin Name</h3>
              <h1 className="text-base font-medium">John Doe</h1>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail strokeWidth={1.5} size={20} className="text-green-500" />
            <div>
              <h3 className="text-sm">Email</h3>
              <h1 className="text-base font-medium">info@hamad.qa</h1>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone strokeWidth={1.5} size={20} className="text-green-500" />
            <div>
              <h3 className="text-sm">Contact No.</h3>
              <h1 className="text-base font-medium">+971 50 123 4567</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Button className="w-fit" onClick={onNext}>
          Look Good, Continue
        </Button>
      </div>
    </div>
  )
}

export default Welcome

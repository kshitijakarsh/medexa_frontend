// "use client";

// export function DoctorHeader() {
//   return (
//     <div className="bg-white rounded-xl border p-4 flex items-center gap-4">
//       <img
//         src="/doctor.jpg"
//         className="w-16 h-16 rounded-full object-cover"
//         alt="Doctor"
//       />

//       <div className="space-y-1">
//         <h2 className="text-lg font-semibold">Dr. Michael Chen</h2>
//         <p className="text-sm text-gray-600">Cardiology Specialist</p>

//         <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full">
//           Active
//         </span>
//       </div>
//     </div>
//   );
// }



"use client";

import {
    BadgeCheck,
    Mail,
    Phone,
    Calendar,
    Clock,
    Award,
    Briefcase,
} from "lucide-react";

export function DoctorHeader() {
    return (
        <div className=" bg-white p-0 rounded-2xl">
            <div className=" rounded-xl border p-6 flex flex-col gap-3">
                <div className=" flex gap-6">
                    {/* Avatar */}
                    <img
                        src="/images/avatars/1.png"
                        className="w-20 h-20 rounded-lg object-cover border border-green-500"
                        alt="Doctor"
                    />

                    <div className="flex-1">
                        {/* Name + specialist */}
                        <h2 className="text-xl font-semibold">Dr. Michael Chen</h2>
                        <p className="text-gray-600 text-sm">Cardiology Specialist</p>

                        {/* Degree + status badge */}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs rounded-full border">
                                MBBS, MD Cardiology
                            </span>

                            <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full flex items-center gap-1">
                                <BadgeCheck size={14} />
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-3 gap-6 mt-6">

                    {/* License Number */}
                    <InfoItem
                        icon={<Award size={18} />}
                        iconColor="bg-blue-100 text-blue-700"
                        label="License Number"
                        value="MED-2015-45678"
                    />

                    {/* Email */}
                    <InfoItem
                        icon={<Mail size={18} />}
                        iconColor="bg-purple-100 text-purple-700"
                        label="Email"
                        value="m.chen@medexa.com"
                    />

                    {/* OPD Timings */}
                    <InfoItem
                        icon={<Clock size={18} />}
                        iconColor="bg-green-100 text-green-700"
                        label="OPD Timings"
                        value="9:00 AM - 2:00 PM"
                    />

                    {/* Experience */}
                    <InfoItem
                        icon={<Briefcase size={18} />}
                        iconColor="bg-orange-100 text-orange-700"
                        label="Experience"
                        value="12 Years"
                    />

                    {/* Contact Number */}
                    <InfoItem
                        icon={<Phone size={18} />}
                        iconColor="bg-yellow-100 text-yellow-700"
                        label="Contact Number"
                        value="+1 (555) 123-4567"
                    />

                    {/* Working Days */}
                    <InfoItem
                        icon={<Calendar size={18} />}
                        iconColor="bg-red-100 text-red-700"
                        label="Working Days"
                        value="Monday, Wednesday, Friday"
                    />
                </div>
            </div>
        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
    iconColor,
}: {
    icon: any;
    label: string;
    value: string;
    iconColor: string;
}) {
    return (
        <div className="flex gap-2 items-center">
            <div
                className={`w-10 h-10 rounded-md flex items-center justify-center ${iconColor}`}
            >
                {icon}
            </div>
            <div className="flex flex-col items-start gap-1">
                <span className="text-xs text-gray-600">{label}</span>
                <span className="font-medium text-gray-800">{value}</span>
            </div>
        </div>
    );
}

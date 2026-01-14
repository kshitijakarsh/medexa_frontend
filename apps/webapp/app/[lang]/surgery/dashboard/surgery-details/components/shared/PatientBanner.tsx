import React from "react";
import Image from "next/image";
import { Clock, Phone, Mail, User, List, Printer, Download } from "lucide-react";
import { Patient } from "@/app/[lang]/surgery/_lib/types";

import { useDictionary } from "@/i18n/use-dictionary";

const defaultPatient: Patient = {
  id: "1",
  name: "Fatima Al-Sabah",
  mrn: "MRN-2501",
  age: 55,
  gender: "Male", // Note: Image says Male, name sounds female, sticking to image text
  phone: "284-1979-0156289",
  email: "Abc@gmail.com",
  randomNumber: "1234567890",
  insuranceProvider: "Kuwait Insurance",
  insuranceStatus: "Active",
  imageUrl: "/images/avatars/1.png",
  avatarUrl: "/images/avatars/1.png",
};

export interface BannerActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  position: "top-right" | "bottom-right";
  variant?: "primary" | "outline";
}

interface PatientBannerProps {
  patient?: Patient;
  customAction?: React.ReactNode; // Deprecated
  actions?: React.ReactNode; // Deprecated
  actionItems?: BannerActionItem[];
  onViewDetails?: () => void;
  isEditing?: boolean;
  className?: string;
}

const StandardizedButton = ({
  action,
  className = "",
}: {
  action: BannerActionItem;
  className?: string;
}) => {
  const isPrimary = action.variant === "primary";
  const baseClass =
    "flex items-center gap-1 text-sm py-1.5 pr-4 pl-2 rounded-md transition-colors w-full justify-start";
  const primaryClass = "bg-blue-500 py-1 border-blue-200 text-white justify-center";
  const outlineClass =
    "text-blue-500 border border-blue-200";

  return (
    <button
      onClick={action.onClick}
      className={`${baseClass} ${isPrimary ? primaryClass : outlineClass} ${className
        }`}
    >
      {action.icon && !isPrimary && (
        <div className="bg-blue-100 p-2 rounded-sm text-blue-500 shrink-0">
          {action.icon}
        </div>
      )}
      {action.icon && isPrimary && <span className="shrink-0">{action.icon}</span>}
      <span className="truncate">{action.label}</span>
    </button>
  );
};

const PatientBanner: React.FC<PatientBannerProps> = ({
  patient = defaultPatient,
  customAction,
  actions,
  actionItems = [],
  onViewDetails,
  isEditing = false,
  className,
}) => {
  const dict = useDictionary();
  const topRightActions = actionItems.filter((a) => a.position === "top-right");
  const bottomRightActions = actionItems.filter(
    (a) => a.position === "bottom-right"
  );

  return (
    <div
      className={`bg-white rounded-3xl shadow-sm border-b-2 border-blue-500 p-5 flex justify-between ${className || ""
        }`}
    >
      {/* Left Column - Patient Details */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={
              patient.imageUrl || patient.avatarUrl || "/images/avatars/1.png"
            }
            alt={patient.name}
            width={46}
            height={46}
            className="shrink-0 aspect-square rounded-full object-cover border-2 border-emerald-100"
          />

          <div>
            <h2 className="text-sm font-medium text-slate-800">{patient.name}</h2>
            <p className="text-sm text-slate-500">{patient.mrn}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-600">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-blue-400" />
              <span>
                {patient.age}Y / {patient.gender}{" "}
                <span className="">|</span> {patient.randomNumber}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <Phone size={15} className="text-blue-400" />
              <span>{patient.phone}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Mail size={15} className="text-blue-400" />
              <span>{patient.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <User size={15} className="text-blue-400" />
            <span className="text-slate-700 text-sm">
              {patient.insuranceProvider}
            </span>
            <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-medium tracking-wide">
              {dict.pages.surgery.surgeryDetails.banner.insurance}: {patient.insuranceStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column - All Buttons */}
      <div className="flex flex-col justify-between min-w-[200px] py-1">
        <div className="flex flex-col gap-2">
          {topRightActions.map((action, idx) => (
            <StandardizedButton key={idx} action={action} />
          ))}

          {/* Render legacy actions if provided */}
          {actions && <div className="flex flex-col gap-2">{actions}</div>}

          {/* Fallback for legacy prop usage or internal actions if not replaced yet */}
          {isEditing && !actions && topRightActions.length === 0 && (
            <>
              <StandardizedButton
                action={{
                  label: dict.pages.surgery.surgeryDetails.banner.printDocument,
                  icon: <Printer size={12} />,
                  position: "top-right",
                  variant: "outline",
                }}
              />
              <StandardizedButton
                action={{
                  label: dict.pages.surgery.surgeryDetails.banner.downloadDocument,
                  icon: <Download size={12} />,
                  position: "top-right",
                  variant: "outline",
                }}
              />
            </>
          )}

        </div>

        <div className="flex flex-col gap-2 mt-auto">
          {onViewDetails && !isEditing && (
            <div className="">
              <StandardizedButton
                action={{
                  label: dict.pages.surgery.surgeryDetails.banner.viewDetails,
                  icon: <List size={12} />,
                  position: "bottom-right",
                  onClick: onViewDetails,
                  variant: "outline"
                }}
              />
            </div>
          )}
          {bottomRightActions.map((action, idx) => (
            <div key={idx} className="">
              <StandardizedButton action={action} />
            </div>
          ))}
          {customAction && <div className="">{customAction}</div>}
        </div>
      </div>
    </div>
  );
};

export default PatientBanner;

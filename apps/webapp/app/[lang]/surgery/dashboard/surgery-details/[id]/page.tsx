"use client";

import React from "react";
import { ArrowLeft, Save, FilePlus2Icon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Patient } from "../../../_lib/types";
import PatientBanner from "../components/shared/PatientBanner";
import PostOpCare from "../components/post-op/PostOpCare";
import NurseCare from "../components/nurse/NurseCare";
import IntraOpNotes from "../components/intra-op/IntraOpNotes";
import PreOpChecklist from "../components/pre-op/PreOpChecklist";
import { AnesthesiaPlan } from "../components/anesthesia/AnesthesiaPlan";
import { SurgeryDetailsTab } from "../components/surgery-details/SurgeryDetailsTab";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { useSurgeryById } from "@/app/[lang]/surgery/_hooks/useSurgery";
import { Skeleton } from "@workspace/ui/components/skeleton";

const PATIENT_DATA: Patient = {
  id: "2",
  name: "Sarah Williams",
  mrn: "00324891",
  age: 55,
  gender: "Male",
  phone: "284-104123567",
  email: "sarah.williams@example.com",
  randomNumber: "APP-0539-17",
  insuranceProvider: "Gulf Insurance",
  insuranceStatus: "Active",
  imageUrl: "/images/avatars/1.png",
  avatarUrl: "/images/avatars/1.png",
};

export default function SurgeryDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [activeTab, setActiveTab] = React.useState("Surgery Details");
  const [isEditing, setIsEditing] = React.useState(false);
  const [anesthesiaActiveTab, setAnesthesiaActiveTab] = React.useState("Medical History");

  const { data: surgeryData, isLoading } = useSurgeryById(id as string);

  // Map surgeryData to Patient interface for common banner
  const patientData: Patient | undefined = surgeryData?.patient ? {
    id: surgeryData.patient.id,
    name: `${surgeryData.patient.first_name} ${surgeryData.patient.last_name}`,
    mrn: surgeryData.patient.civil_id || "N/A",
    age: 0,
    gender: "Male",
    phone: surgeryData.patient.mobile_number || "",
    email: "",
    randomNumber: surgeryData.id,
    insuranceProvider: "N/A",
    insuranceStatus: "Active",
    imageUrl: "/images/avatars/1.png",
    avatarUrl: "/images/avatars/1.png",
  } : undefined;

  const getBannerAction = () => {
    if (activeTab === "Anesthesia Plan" && anesthesiaActiveTab === "Anesthesia Plan") {
      return (
        <div className="flex gap-3 shrink-0 mb-1">
          <button className="flex items-center gap-2 border border-blue-500 text-blue-500 rounded-lg px-3 py-1.5 bg-white hover:bg-blue-50 font-medium text-sm">
            <Save size={16} />
            Save Assessment
          </button>
          <div className="relative group">
            <button className="flex items-center gap-1 bg-blue-500 text-white rounded-lg px-3 py-1.5 text-sm">
              <div className="bg-blue-400 p-1 rounded-md">
                <FilePlus2Icon size={16} />
              </div>
              Submit Clearances
            </button>

            <div className="absolute right-0 top-full hidden flex-col gap-1 rounded-lg bg-blue-50 p-1 shadow-lg group-hover:flex z-50">
              <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-slate-700 bg-white rounded-lg text-left">
                Fit For Anesthesia
              </button>
              <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-slate-700 bg-white rounded-lg text-left">
                Not fit for anesthesia
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  // Show loading skeleton while surgery data is loading
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="col-span-4">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="bg-white p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-slate-800">Surgery Details</h1>
      </div>

      <PatientBanner
        patient={patientData || PATIENT_DATA}
        customAction={getBannerAction()}
        onViewDetails={!getBannerAction() ? () => setIsEditing(true) : undefined}
        isEditing={isEditing}
      />

      <div className="overflow-x-auto">
        <DynamicTabs
          tabs={[
            { key: "Surgery Details", label: "Surgery Details" },
            { key: "Pre-Op Checklist", label: "Pre-Op Checklist" },
            { key: "Anesthesia Plan", label: "Anesthesia Plan" },
            { key: "Intra-Op Notes", label: "Intra-Op Notes" },
            { key: "Nurse", label: "Nurse" },
            { key: "Post-Op Care", label: "Post-Op Care" },
          ]}
          defaultTab={activeTab}
          onChange={setActiveTab}
          variant="scroll"
        />
      </div>

      {activeTab === "Post-Op Care" ? (
        <PostOpCare
          isEditing={isEditing}
          onSaveDraft={() => setIsEditing(false)}
          surgeryId={id as string}
          patientId={surgeryData?.patient_id}
        />
      ) : activeTab === "Nurse" ? (
        <NurseCare
          isEditing={isEditing}
          onSaveDraft={() => setIsEditing(false)}
          surgeryId={id as string}
          patientId={surgeryData?.patient_id}
        />
      ) : activeTab === "Intra-Op Notes" ? (
        <IntraOpNotes
          isEditing={isEditing}
          onSaveDraft={() => setIsEditing(false)}
          surgeryId={id as string}
          patientId={surgeryData?.patient_id}
        />
      ) : activeTab === "Anesthesia Plan" ? (
        <AnesthesiaPlan
          activeTab={anesthesiaActiveTab}
          onTabChange={setAnesthesiaActiveTab}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          surgeryId={id as string}
          patientId={surgeryData?.patient_id}
        />
      ) : activeTab === "Pre-Op Checklist" ? (
        <PreOpChecklist
          isEditing={isEditing}
          onSaveDraft={() => setIsEditing(false)}
          onEdit={() => setIsEditing(true)}
          surgeryId={id as string}
          patientId={surgeryData?.patient_id}
        />
      ) : (
        <SurgeryDetailsTab
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          surgeryId={id as string}
          patientId={surgeryData?.patient_id}
          surgeryData={surgeryData}
        />
      )}
    </div>
  );
}

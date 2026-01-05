"use client";

import React from "react";
import ChecklistSidebar from "../shared/ChecklistSidebar";

export type ItemStatus = "Completed" | "Ordered" | "Pending" | "Processing" | "Due" | "N/A";

export type ChecklistItem = {
  label: string;
  status?: ItemStatus;
  subLabel?: string;
  category?: string;
  urgency?: string;
  orderedBy?: string;
  previousResult?: {
    date: string;
    count: number;
  };
  doctor?: string;
  clearanceStatus?: string;
  notes?: string;
};

export type PreOpMetric = {
  title: string;
  completed: number;
  total: number;
};

export type AddOption = {
  value: string;
  label: string;
  group?: string;
};

export type SectionConfig = {
  title: string;
  count?: string;
  showChanged?: boolean;
  items: ChecklistItem[];
  addLabel: string;
  addOptions: AddOption[];
};

export const INITIAL_SECTIONS: SectionConfig[] = [
  {
    title: "Procedures",
    showChanged: false,
    items: [
      {
        label: "Laparoscopic Cholecystectomy",
        subLabel: "Impression: Normal sinus rhythm. No ST-T wave changes. No evidence of acute ischemia."
      },
    ],
    addLabel: "Add Procedure",
    addOptions: [
      { value: "lap_chole", label: "Laparoscopic Cholecystectomy" },
      { value: "appendectomy", label: "Appendectomy" },
      { value: "hernia", label: "Hernia Repair" },
    ],
  },
  {
    title: "Required Investigations",
    showChanged: true,
    items: [
      { label: "Complete Blood Count (CBC)", status: "Completed", subLabel: "2025-09-27 19:30", urgency: "Stat", orderedBy: "Dr. Vinay" },
      { label: "Liver Function Test (LFT)", status: "Completed", subLabel: "2025-09-27 19:30", category: "Laboratory Test", urgency: "Stat", orderedBy: "Dr. Vinay" },
      {
        label: "Renal Function Test (RFT)",
        status: "Ordered",
        subLabel: "2025-09-27 19:30",
        category: "Radiology & Imaging",
        urgency: "Stat",
        orderedBy: "Dr. Sarah",
        previousResult: {
          date: "05-Dec-2025",
          count: 2
        }
      },
      { label: "Blood Sugar (Fasting)", status: "Pending", category: "Laboratory Test", urgency: "Stat" },
      { label: "Coagulation Profile (PT/INR)", status: "Pending", category: "Laboratory Test", urgency: "Stat" },
    ],
    addLabel: "Add Investigation",
    addOptions: [
      { value: "cbc", label: "Complete Blood Count (CBC)", group: "Laboratory" },
      { value: "lft", label: "Liver Function Test (LFT)", group: "Laboratory" },
      { value: "rft", label: "Renal Function Test (RFT)", group: "Laboratory" },
      { value: "pt_inr", label: "Coagulation Profile (PT/INR)", group: "Laboratory" },
      { value: "cxr", label: "Chest X-Ray", group: "Radiology" },
      { value: "ecg", label: "ECG", group: "Radiology" },
    ],
  },
  {
    title: "Medical Clearances",
    items: [
      { label: "Anaesthesia Clearance", status: "Pending", doctor: "Dr. Vinay" },
      { label: "Physician Clearance", status: "Completed", doctor: "Dr. Vinay", clearanceStatus: "Fit for Surgery", notes: "Cleared for surgery with no contraindications." },
      { label: "Cardiology Clearance", status: "Completed", doctor: "Dr. Vinay", clearanceStatus: "Fit for Surgery", notes: "Normal ECG. Stable for GA." },
    ],
    addLabel: "Add Clearance",
    addOptions: [
      { value: "anaesthesia", label: "Anaesthesia Clearance" },
      { value: "physician", label: "Physician Clearance" },
      { value: "cardiology", label: "Cardiology Clearance" },
      { value: "pulmonology", label: "Pulmonology Clearance" },
      { value: "nephrology", label: "Nephrology Clearance" },
    ],
  },
  {
    title: "Consents Required",
    items: [
      { label: "Surgical Consent", status: "Completed", subLabel: "Signed by patient & surgeon" },
      { label: "Anaesthesia Consent", status: "Pending" },
      { label: "Blood Transfusion Consent", status: "Pending" },
    ],
    addLabel: "Add Consent",
    addOptions: [
      { value: "surgical", label: "Surgical Consent" },
      { value: "anaesthesia", label: "Anaesthesia Consent" },
      { value: "blood", label: "Blood Transfusion Consent" },
    ],
  },
  {
    title: "Nursing Orders (Pre-Op)",
    items: [
      { label: "NPO Status Check", status: "Completed", subLabel: "Confirmed NPO since 10 PM" },
      { label: "Pre-medication Administered", status: "Ordered", subLabel: "Midazolam ordered" },
      { label: "Vitals Recorded", status: "Pending" },
    ],
    addLabel: "Add Nursing Order",
    addOptions: [
      { value: "npo", label: "NPO Status Check" },
      { value: "vitals", label: "Vitals Recorded" },
      { value: "meds", label: "Pre-medication Administered" },
    ],
  },
  {
    title: "Patient Preparation Requirements",
    items: [
      { label: "Site Marking", status: "Completed", subLabel: "Marked by Dr. Vinay" },
      { label: "Skin Preparation", status: "Pending" },
      { label: "Jewelry/Dentures Removed", status: "Pending" },
    ],
    addLabel: "Add Prep Requirement",
    addOptions: [
      { value: "marking", label: "Site Marking" },
      { value: "shaving", label: "Skin Preparation" },
      { value: "jewelry", label: "Jewelry/Dentures Removed" },
    ],
  },
  {
    title: "Anaesthesia Requirements",
    items: [
      { label: "GA Machine Check", status: "Pending" },
      { label: "Spinal Tray", status: "Ordered", subLabel: "Requested from CSSD" },
      { label: "Difficult Airway Cart", status: "N/A" },
    ],
    addLabel: "Add Anaesthesia Req",
    addOptions: [
      { value: "ga_check", label: "GA Machine Check" },
      { value: "spinal", label: "Spinal Tray" },
      { value: "airway", label: "Difficult Airway Cart" },
    ],
  },
  {
    title: "Equipment & Instruments",
    items: [
      { label: "Laparoscopic Tower", subLabel: "Reserved for OR 2", status: "Ordered" },
      { label: "Laparoscopic Cholecystectomy Set", status: "Pending" },
      { label: "Cautery Logic (Diathermy)", status: "Pending" },
    ],
    addLabel: "Add Equipment",
    addOptions: [
      { value: "lap_tower", label: "Laparoscopic Tower" },
      { value: "chole_set", label: "Laparoscopic Cholecystectomy Set" },
      { value: "cautery", label: "Cautery Logic (Diathermy)" },
    ],
  },
  {
    title: "Implants & Consumables",
    items: [
      { label: "Prolene Mesh (15x15)", status: "Ordered", subLabel: "Size verification needed" },
      { label: "Tacker (Absorbable)", status: "Pending" },
      { label: "Trocars (10mm, 5mm)", status: "Pending" },
    ],
    addLabel: "Add Implant/Consumable",
    addOptions: [
      { value: "mesh", label: "Prolene Mesh (15x15)" },
      { value: "tacker", label: "Tacker (Absorbable)" },
      { value: "trocars", label: "Trocars (10mm, 5mm)" },
    ],
  },
  {
    title: "Blood & Resource Preparation",
    items: [
      { label: "Blood Grouping & Cross Matching", status: "Completed", subLabel: "O+ Confirmed" },
      { label: "Reserve 2 Units PRBC", status: "Ordered", subLabel: "Sent to Blood Bank" },
    ],
    addLabel: "Add Blood/Resource",
    addOptions: [
      { value: "grouping", label: "Blood Grouping & Cross Matching" },
      { value: "reserve", label: "Reserve 2 Units PRBC" },
      { value: "ffp", label: "FFP (Fresh Frozen Plasma)" },
    ],
  },
];

export const STATUS_STYLES: Record<ItemStatus, string> = {
  Completed: "bg-green-500 text-white",
  Ordered: "bg-orange-500 text-white",
  Pending: "bg-slate-300 text-slate-700",
  Processing: "bg-blue-500 text-white",
  Due: "bg-red-500 text-white",
  "N/A": "bg-slate-200 text-slate-500",
};

export const newItemUrgencyStyle = (urgency: string) => {
  switch (urgency.toLowerCase()) {
    case "stat": return "bg-red-100 text-red-500 border-red-200";
    case "urgent": return "bg-orange-100 text-orange-500 border-orange-200";
    case "routine": return "bg-blue-100 text-blue-500 border-blue-200";
    default: return "bg-slate-100 text-slate-500 border-slate-200";
  }
};

import { PreOpViewMode } from "./views/PreOpViewMode";
import { PreOpEditMode } from "./views/PreOpEditMode";

const MOCK_METRICS: PreOpMetric[] = [
  { title: "Clinical Readiness", completed: 6, total: 7 },
  { title: "Medical & Legal Clearance", completed: 6, total: 7 },
  { title: "Patient Preparation", completed: 6, total: 7 },
  { title: "OT & Resource Readiness", completed: 6, total: 7 },
];

export default function PreOpChecklist({ isEditing, onSaveDraft, onEdit }: { isEditing?: boolean; onSaveDraft?: () => void; onEdit?: () => void }) {
  const [sectionsData, setSectionsData] = React.useState<SectionConfig[]>(INITIAL_SECTIONS);

  // Calculate sidebar counts dynamically
  const sidebarItems = sectionsData
    .filter(section => section.title !== "Procedures")
    .map(section => ({
      label: section.title,
      completedCount: section.items.filter(item => item.status === "Completed").length,
      pendingCount: section.items.filter(item => item.status === "Pending" || item.status === "Ordered" || item.status === "Processing").length
    }));

  const totalCompleted = sidebarItems.reduce((acc, item) => acc + item.completedCount, 0);
  const totalPending = sidebarItems.reduce((acc, item) => acc + item.pendingCount, 0);

  const sidebarHeader = {
    title: "All Pre-Op Checklist",
    completedCount: totalCompleted,
    pendingCount: totalPending
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
      <div className="lg:col-span-1 sticky top-4 self-start">
        <ChecklistSidebar header={sidebarHeader} items={sidebarItems} />
      </div>

      <div className="lg:col-span-3">
        {isEditing ? (
          <PreOpEditMode
            sections={sectionsData}
            setSections={setSectionsData}
            onSaveDraft={onSaveDraft}
          />
        ) : (
          <PreOpViewMode
            sectionsData={sectionsData}
            setSectionsData={setSectionsData}
            onEdit={onEdit}
            metrics={MOCK_METRICS}
          />
        )}
      </div>
    </div>
  );
}

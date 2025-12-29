import React from "react";
import { AlertCircle, AlertTriangle, Link as LinkIcon } from "lucide-react";

interface ClinicalItem {
  id: string;
  name: string;
  detail?: string;
  type: "problem" | "allergy" | "medication";
}

const problems: ClinicalItem[] = [
  { id: "1", name: "Hypertension - Well controlled", type: "problem" },
  { id: "2", name: "Dyslipidemia - On treatment", type: "problem" },
  { id: "3", name: "Allergic Rhinitis - Seasonal", type: "problem" },
];

const allergies: ClinicalItem[] = [
  { id: "1", name: "Penicillin - Rash", type: "allergy" },
  { id: "2", name: "Sulfa Drugs - Stevens-Johnson", type: "allergy" },
  { id: "3", name: "Latex - Contact dermatitis", type: "allergy" },
];

const medications: ClinicalItem[] = [
  { id: "1", name: "Amlodipine", detail: "5mg once daily", type: "medication" },
  {
    id: "2",
    name: "Atorvastatin",
    detail: "20mg at bedtime",
    type: "medication",
  },
  { id: "3", name: "Aspirin", detail: "75mg once daily", type: "medication" },
];

const ClinicalSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Active Problems */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <AlertCircle size={18} />
          <h3 className="font-medium">Active Problems</h3>
        </div>
        <div className="space-y-2">
          {problems.map((item) => (
            <div
              key={item.id}
              className="bg-yellow-50 border border-yellow-100 text-slate-700 text-sm px-4 py-2.5 rounded-md"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <AlertTriangle size={18} />
          <h3 className="font-medium">Allergies</h3>
        </div>
        <div className="space-y-2">
          {allergies.map((item) => (
            <div
              key={item.id}
              className="bg-red-50 border border-red-100 text-slate-700 text-sm px-4 py-2.5 rounded-md"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Medications */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <LinkIcon size={18} />
          <h3 className="font-medium">Ongoing Medications</h3>
        </div>
        <div className="space-y-2">
          {medications.map((item) => (
            <div
              key={item.id}
              className="bg-blue-50 border border-blue-100 text-slate-700 text-sm px-4 py-2.5 rounded-md hover:bg-blue-50 transition-colors"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-slate-500">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicalSidebar;

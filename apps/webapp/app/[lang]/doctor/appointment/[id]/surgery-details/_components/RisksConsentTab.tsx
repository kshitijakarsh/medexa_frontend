import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";

export default function RisksConsentTab() {
  const [risksExplained, setRisksExplained] = useState(true);
  const [consentTaken, setConsentTaken] = useState(true);

  return (
    <div className="space-y-6">

      {/* Risks Explained */}
      <CheckboxCard
        label="Explain Surgical Risks to Patient"
        description="Confirm that all surgical risks, complications, and alternatives have been explained."
        checked={risksExplained}
        onChange={() => setRisksExplained(!risksExplained)}
      />

      {/* Consent Taken */}
      <CheckboxCard
        label="Consent Taken"
        description="Patient has provided informed consent for the surgical procedure."
        checked={consentTaken}
        onChange={() => setConsentTaken(!consentTaken)}
      />

      {/* Upload Consent Form */}
      <div className="space-y-2">
        <p className="font-semibold">Upload Consent Form</p>

        <div className="border p-4 rounded-xl bg-gray-50">
          <img src="/mock/consent-form.png" className="w-40" />
          <button className="text-blue-600 mt-2 underline flex items-center gap-2">
            View
          </button>
        </div>
      </div>

    </div>
  );
}

function CheckboxCard({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-white border rounded-xl shadow-sm">
      <button onClick={onChange} className="mt-1">
        {checked ? (
          <CheckSquare className="text-blue-600" />
        ) : (
          <Square className="text-gray-400" />
        )}
      </button>

      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-gray-600 text-sm">
          {description}{" "}
          <span className="text-xs text-gray-500">
            Recorded by Dr. Sarah on Nov 14, 2024
          </span>
        </p>
      </div>
    </div>
  );
}

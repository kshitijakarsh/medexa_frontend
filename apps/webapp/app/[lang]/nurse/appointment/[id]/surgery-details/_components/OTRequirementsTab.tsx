export default function OTRequirementsTab() {
  return (
    <div className="space-y-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Detail label="OT Room Preference" value="General Surgery" />
        <Detail label="Assistant Staff Needed" value="Nurse & OT Technician" />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
        <p className="font-semibold text-gray-800 mb-2">OT Room Instructions</p>

        <p className="text-gray-700 leading-relaxed">
          The OT must be fully cleaned and sterilized before the procedure, with all required
          instruments and equipment arranged and checked. The anesthesia machine, monitors, and
          emergency supplies must be tested. Patient identity, consent, and pre-operative checklist
          must be verified before shifting the patient to the OT.
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value } : {label: string, value: string}) {
  return (
    <div className="bg-white border p-3 rounded-lg shadow-sm">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

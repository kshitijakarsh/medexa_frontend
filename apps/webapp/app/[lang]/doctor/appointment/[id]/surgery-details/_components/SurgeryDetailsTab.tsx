// export default function SurgeryDetailsTab() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//       <DetailBox label="Surgery Type" value="Laparoscopic Cholecystectomy" />
//       <DetailBox label="Surgery Category" value="General Surgery" />

//       <DetailBox label="Preferred Surgery Date" value="25/11/2025" />
//       <DetailBox label="Suggested Time" value="10:30 AM" />

//       <DetailBox label="Surgical Department" value="General Surgery Department" />
//       <DetailBox label="Surgeon/Co-Surgeon" value="Dr. A. Prakash, Dr. Neha Rao" />

//       <DetailBox label="Anesthetist Required" value="Yes" />
//     </div>
//   );
// }

// function DetailBox({ label, value }) {
//   return (
//     <div className="bg-gray-50 p-3 rounded-lg border shadow-sm">
//       <p className="text-gray-500 text-sm">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   );
// }



// app/surgery/[id]/_components/tabs/SurgeryDetailsTab.tsx
"use client";

export default function SurgeryDetailsTab() {
  const details = [
    { label: "Surgery Type", value: "Laparoscopic Cholecystectomy" },
    { label: "Surgery Category", value: "General Surgery" },
    { label: "Preferred Surgery Date", value: "25/11/2025" },
    { label: "Suggested Time", value: "10:30 AM" },
    { label: "Surgical Department", value: "General Surgery Department" },
    { label: "Surgeon/Co-Surgeon", value: "Dr. A. Prakash, Dr. Neha Rao" },
    { label: "Anesthetist Required", value: "Yes" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {details.map((d) => (
        <div key={d.label} className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-gray-500 text-sm">{d.label}</p>
          <p className="font-semibold">{d.value}</p>
        </div>
      ))}
    </div>
  );
}

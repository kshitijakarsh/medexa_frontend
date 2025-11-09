// "use client";

// import { UploadCard } from "./UploadCard";

// export function Documents() {
//   const docs = [
//     "QCHP License Copy",
//     "Passport Copy",
//     "ID Proof",
//     "Resume / CV",
//     "Offer Letter / Contract",
//     "Signature",
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {docs.map((doc) => (
//         <div key={doc} className="space-y-2">
//           <p className="font-medium text-gray-700 text-sm">{doc}</p>
//           <UploadCard title={doc} />
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { UploadCard } from "./UploadCard";

export function Documents({ form }: { form: any }) {
  const docs = [
    "QCHP License Copy",
    "Passport Copy",
    "ID Proof",
    "Resume / CV",
    "Offer Letter / Contract",
    "Signature",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {docs.map((doc) => (
        <div key={doc} className="space-y-2">
          <p className="font-medium text-gray-700 text-sm">{doc}</p>
          <UploadCard title={doc} />
        </div>
      ))}
    </div>
  );
}

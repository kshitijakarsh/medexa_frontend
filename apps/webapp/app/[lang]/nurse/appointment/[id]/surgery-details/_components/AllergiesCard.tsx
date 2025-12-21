// app/surgery/[id]/_components/AllergiesCard.tsx
"use client";

export default function AllergiesCard() {
  const allergies = [
    "Penicillin - Rash",
    "Sulfa Drugs - Stevens-Johnson",
    "Latex - Contact dermatitis",
  ];

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <h4 className="font-semibold mb-3">Allergies</h4>
      <div className="space-y-2">
        {allergies.map((a, i) => (
          <div key={i} className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm">
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}

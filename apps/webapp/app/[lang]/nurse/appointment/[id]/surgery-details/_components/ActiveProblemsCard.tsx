// app/surgery/[id]/_components/ActiveProblemsCard.tsx
"use client";

export default function ActiveProblemsCard() {
  const problems = [
    "Hypertension - Well controlled",
    "Dyslipidemia - On treatment",
    "Allergic Rhinitis - Seasonal",
  ];

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <h4 className="font-semibold mb-3">Active Problems</h4>
      <div className="space-y-2">
        {problems.map((p, i) => (
          <div key={i} className="bg-yellow-50 text-yellow-800 px-3 py-2 rounded-lg text-sm">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

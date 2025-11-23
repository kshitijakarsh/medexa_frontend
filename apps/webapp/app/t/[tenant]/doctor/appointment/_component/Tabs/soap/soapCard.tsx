export function SOAPCard({ title, text, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 border rounded-xl cursor-pointer transition-all
        ${selected ? "border-blue-400 bg-blue-50 shadow" : "border-gray-200"}
      `}
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 text-sm">{text || "-----"}</p>
    </div>
  );
}

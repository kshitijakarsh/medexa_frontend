// interface SOAPCardProps {
//   title: string
//   text?: string
//   selected: boolean
//   onClick: () => void
// }

// export function SOAPCard({ title, text, selected, onClick }: SOAPCardProps) {
//   return (
//     <div
//       onClick={onClick}
//       className={`
//         p-4 border rounded-xl cursor-pointer transition-all
//         ${selected ? "border-blue-400 bg-blue-50 shadow" : "border-gray-200"}
//       `}
//     >
//       <h3 className="font-semibold mb-2">{title}</h3>
//       <p className="text-gray-700 text-sm">{text || "-----"}</p>
//     </div>
//   )
// }

interface SOAPCardProps {
  title: string;
  text?: string;
  selected: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
}

export function SOAPCard({
  title,
  text,
  selected,
  onClick,
  onChange
}: SOAPCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-xl border transition-all cursor-pointer
        ${selected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300 bg-white"}
        hover:shadow-sm
      `}
    >
      {/* Floating Title */}
      <div
        className={`
          absolute top-1 left-2 px-2 text-md font-semibold 
          ${selected ? "text-blue-600 bg-blue-50" : "text-gray-700 bg-white"}
        `}
      >
        {title}
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        // onClick={(e) => e.stopPropagation()} // prevents selection click
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full text-gray-900 rounded-xl bg-transparent
          border-none outline-none
          px-4 py-4 pt-6 resize-none
          focus:ring-0
        `}
        rows={5}
      />
    </div>
  );
}

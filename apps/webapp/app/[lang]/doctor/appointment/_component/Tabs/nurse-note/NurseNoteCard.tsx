export default function NurseNoteCard({ data } : any) {
  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={data.avatar}
          alt={data.name}
          className="w-14 h-14 object-cover rounded-full"
        />

        <div className="flex-1">
          {/* Name + Time */}
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-500 mb-2">{data.time}</p>

          {/* Note Text */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.note}
          </p>
        </div>
      </div>
    </div>
  );
}

// interface AttachmentCardProps {
//   data: any,
//   onView: () => void
// }

// export default function AttachmentCard({ data, onView }: AttachmentCardProps) {
//   return (
//     <div className="border rounded-xl p-3 shadow-sm bg-white cursor-pointer hover:shadow-md transition">
//       <p className="font-semibold mb-2">{data.title}</p>

//       <div className="rounded-lg overflow-hidden border">
//         <img
//           src={data.preview}
//           alt={data.title}
//           className="w-full h-32 object-cover"
//           onClick={onView}
//         />
//       </div>

//       <div className="flex justify-center mt-2 text-blue-600" onClick={onView}>
//         <span className="underline">View</span>
//         <img src="/icons/view-icon.svg" className="w-5 h-5 ml-2" />
//       </div>
//     </div>
//   );
// }


interface AttachmentCardProps {
  data: {
    title: string;
    preview: string;
  };
  onView: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
}

export default function AttachmentCard({
  data,
  onView,
  onDelete,
  canDelete = false, // Default to false if not provided, for safety? Or true?
  // Previous code relied on onDelete presence.
  // Let's default to true if onDelete is present, but since we are explicit now, let's default to false if not passed?
  // No, if unrelated components use this, they might not pass canDelete.
  // User said "pass it and hide i from there".
  // Let's use `canDelete` if provided.
}: AttachmentCardProps) {
  return (
    <div className="border rounded-xl p-3 shadow-sm bg-white hover:shadow-md transition">
      <p className="font-semibold mb-2">{data.title}</p>

      <div
        className="rounded-lg overflow-hidden border cursor-pointer"
        onClick={onView}
      >
        <img
          src={data.preview}
          alt={data.title}
          className="w-full h-32 object-cover"
        />
      </div>

      <div className={`flex justify-${!onDelete || !canDelete ? "center" : "between"} items-center mt-3`}>
        <button
          onClick={onView}
          className="text-blue-600 border-blue-600 border-1 px-2 rounded-md hover:text-white hover:bg-blue-600 text-sm cursor-pointer"
        >
          View
        </button>

        {onDelete && canDelete && <button
          onClick={onDelete}
          className="text-red-500 text-sm px-2 rounded-md border-red-500 border-1 hover:text-white hover:bg-red-500 cursor-pointer"
        >
          Delete
        </button>
        }
      </div>
    </div>
  );
}

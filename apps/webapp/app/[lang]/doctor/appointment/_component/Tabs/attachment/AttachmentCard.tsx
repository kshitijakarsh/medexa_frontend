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
  onDelete: () => void;
}

export default function AttachmentCard({
  data,
  onView,
  onDelete,
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

      <div className="flex justify-between items-center mt-3">
        <button
          onClick={onView}
          className="text-blue-600 underline text-sm"
        >
          View
        </button>

        <button
          onClick={onDelete}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

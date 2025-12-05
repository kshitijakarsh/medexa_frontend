export default function AttachmentCard({ data, onView }) {
  return (
    <div className="border rounded-xl p-3 shadow-sm bg-white cursor-pointer hover:shadow-md transition">
      <p className="font-semibold mb-2">{data.title}</p>

      <div className="rounded-lg overflow-hidden border">
        <img
          src={data.preview}
          alt={data.title}
          className="w-full h-32 object-cover"
          onClick={onView}
        />
      </div>

      <div className="flex justify-center mt-2 text-blue-600" onClick={onView}>
        <span className="underline">View</span>
        <img src="/icons/view-icon.svg" className="w-5 h-5 ml-2" />
      </div>
    </div>
  );
}

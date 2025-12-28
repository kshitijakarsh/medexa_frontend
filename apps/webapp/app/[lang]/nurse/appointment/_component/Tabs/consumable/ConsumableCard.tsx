interface ConsumableCardProps {
  data: {
    item_name: string;
    quantity: number;
    cost?: string;
    status: string;
    created_at?: string;
    notes?: string;
  };
  onView: () => void;
  onDelete?: () => void;
}

export default function ConsumableCard({
  data,
  onView,
  onDelete,
}: ConsumableCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-lg">{data.item_name}</p>
          <p className="text-sm text-gray-500">Qty: {data.quantity}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(data.status)}`}>
          {data.status}
        </span>
      </div>

      {data.cost && (
        <p className="text-sm text-gray-600 mb-2">
          Cost: {data.cost}
        </p>
      )}

      {data.created_at && (
        <p className="text-xs text-gray-500 mb-2">
          Issue Date: {new Date(data.created_at).toLocaleString()}
        </p>
      )}

      {data.notes && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {data.notes}
        </p>
      )}

      <div className={`flex justify-${!onDelete ? "center" : "between"} items-center mt-3`}>
        <button
          onClick={onView}
          className="text-blue-600 border-blue-600 border-1 px-3 py-1 rounded-md hover:text-white hover:bg-blue-600 text-sm cursor-pointer"
        >
          View Details
        </button>

        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-500 text-sm px-3 py-1 rounded-md border-red-500 border-1 hover:text-white hover:bg-red-500 cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

interface EquipmentCardProps {
  data: {
    item_name: string;
    asset_tag: string;
    asset_id?: string;
    cost?: string;
    status: string;
    created_at?: string;
    condition_before_use?: string;
    notes?: string;
  };
  onView: () => void;
  onDelete?: () => void;
}

export default function EquipmentCard({
  data,
  onView,
  onDelete,
}: EquipmentCardProps) {
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
          <p className="text-sm text-gray-500">Asset Tag: {data.asset_tag}</p>
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

      {data.condition_before_use && (
        <p className="text-sm text-gray-600 mb-2">
          Condition: {data.condition_before_use}
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

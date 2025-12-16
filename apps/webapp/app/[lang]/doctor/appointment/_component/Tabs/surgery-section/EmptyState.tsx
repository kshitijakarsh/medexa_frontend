
interface EmptySurgeryStateProps {
    onAdd: ()=> void
}

export function EmptySurgeryState({ onAdd } : EmptySurgeryStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-80 text-gray-500">
            <img src="/icons/surgery-empty.svg" className="w-20 opacity-70" />
            <p className="mt-2">No surgery records found.</p>

            <button
                onClick={onAdd}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-full"
            >
                Add Surgery
            </button>
        </div>
    );
}

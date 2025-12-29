interface NoteItem {
    title: string;
    description: string;
}


export const PreOpNote = ({
    title = "Procedures",
    items = []
}: {
    title?: string;
    items?: NoteItem[]
}) => {
    if (!items.length) return null;

    return (
        <div className="bg-white rounded-xl p-4 mb-4 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
                <h3 className="text-md font-medium">{title}</h3>
                <span className="bg-blue-50 text-blue-600 text-sm font-regular px-2 py-0.5 rounded-full">
                    {items.length} Items
                </span>
            </div>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <div className="text-sm font-medium text-black mb-1">{item.title}</div>
                        <div className="text-sm text-black">{item.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
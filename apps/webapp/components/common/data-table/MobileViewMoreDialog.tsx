"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@workspace/ui/components/dialog";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    showInViewMore?: boolean;
}

export function MobileViewMoreDialog<T>({
    open,
    onClose,
    row,
    columns,
}: {
    open: boolean;
    onClose: () => void;
    row: T | null;
    columns: Column<T>[];
}) {
    if (!row) return null;

    const viewMoreColumns = columns.filter(
        (col) => col.key !== "action" && col.showInViewMore !== false
    ) as (Column<T> & { key: keyof T })[];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] overflow-y-auto rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {viewMoreColumns.map((col, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-start border-b pb-2"
                        >
                            <span className="text-[13px] text-gray-500 font-medium">
                                {col.label}
                            </span>

                            <span className="text-[14px] text-blue-700 font-semibold text-right max-w-[55%]">
                                {col.render ? col.render(row) : (row[col.key] as any ?? "-")}
                            </span>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white w-full py-2 rounded-lg"
                    >
                        Close
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

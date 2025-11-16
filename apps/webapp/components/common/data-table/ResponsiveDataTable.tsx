"use client";

import { DataTable } from "../data-table";
import { DataTableDesktop } from "./DataTableDesktop";
import { DataTableMobile } from "./DataTableMobile";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    striped?: boolean;
}

export function ResponsiveDataTable<T>({
    columns,
    data,
    loading,
    striped,
}: Props<T>) {
    return (
        <div className="w-full">
            {/* Mobile */}
            <DataTableMobile columns={columns} data={data} loading={loading} />

            {/* Desktop */}
            {/* <DataTableDesktop
        columns={columns}
        data={data}
        loading={loading}
        striped={striped}
      /> */}
            <div className="hidden md:block max-w-full">
                <DataTable
                    columns={columns}
                    data={data}
                    loading={loading}
                    striped={striped}
                />
            </div>
        </div>
    );
}

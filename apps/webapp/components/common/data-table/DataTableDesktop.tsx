"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

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
  onRowClick?: (row: T) => void;
}

export function DataTableDesktop<T>({
  columns,
  data,
  loading,
  striped = true,
  onRowClick,
}: Props<T>) {
  return (
    <div className="hidden md:block overflow-x-auto max-w-full">
      <Table className="rounded">
        <TableHeader className="bg-[#001A4D]">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key.toString()}
                className={`text-white py-4 whitespace-nowrap ${col.className || ""}`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <tbody aria-hidden="true" className="table-row h-2"></tbody>

        <TableBody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i} className="animate-pulse">
                {columns.map((_, j) => (
                  <TableCell key={j} className="py-4">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => onRowClick?.(row)}
                className={`${striped ? "odd:bg-[#F4FAFF] odd:hover:bg-muted/50" : ""} cursor-default`}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key.toString()}
                    className={`py-2.5 whitespace-nowrap ${col.className || ""}`}
                  >
                    {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

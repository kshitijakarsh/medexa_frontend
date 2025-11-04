"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Loader2 } from "lucide-react"

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  title?: string
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  error?: string | null
  searchComponent?: React.ReactNode
  headerActions?: React.ReactNode
  pagination?: React.ReactNode
  striped?: boolean
  onRowClick?: (row: T) => void
}

export function DataTable<T>({
  title,
  columns,
  data,
  loading,
  error,
  searchComponent,
  headerActions,
  pagination,
  striped = true,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4 border rounded-xl p-0 bg-white overflow-hidden">
      {/* Header */}
      {(title || searchComponent || headerActions) && (
        <div className="flex items-center justify-between">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          <div className="flex items-center gap-4">
            {searchComponent}
            {headerActions}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      {/* Table */}
      <Table className="rounded">
        {/* <TableHeader className="bg-background [&_tr]:border-none ">
          <TableRow className="bg-sidebar hover:bg-sidebar"> */}
        <TableHeader className="bg-[#001A4D] [&_tr]:border-none ">
          <TableRow className="bg-[#001A4D] hover:bg-[#001A4D]">
            {columns.map((col) => (
              <TableHead
                key={col.key.toString()}
                className={`text-white ${col.className || ""}`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Add spacing row */}
        <tbody aria-hidden="true" className="table-row h-2"></tbody>

        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <TableCell key={j} className="py-4">
                      <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-muted-foreground"
              >
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => onRowClick?.(row)}
                className={`${striped ? "odd:bg-[#F4FAFF] odd:hover:bg-muted/50" : ""
                  } border-none hover:bg-transparent cursor-default`}
              >
                {columns.map((col) => (
                  <TableCell key={col.key.toString()} className="py-2.5">
                    {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && <div className="pt-4">{pagination}</div>}
    </div>
  )
}

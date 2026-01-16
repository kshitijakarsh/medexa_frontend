"use client"

import { Skeleton } from "@workspace/ui/components/skeleton"
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
  render?: (row: T, index?: number) => React.ReactNode
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
    <div className="space-y-4 border-0 rounded-xl p-0 bg-transparent overflow-hidden">
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-[#001A4D] hover:bg-[#001A4D] border-none">
              {columns.map((col) => (
                <TableHead
                  key={col.key.toString()}
                  className={`text-white font-semibold py-4 px-6 ${col.className || ""}`}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i} className="animate-pulse border-b border-gray-100">
                    {columns.map((_, j) => (
                      <TableCell key={j} className="py-4 px-6">
                        <Skeleton className="h-4 w-full rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : data.length === 0 ? (
              <TableRow className="border-none">
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-12 text-muted-foreground"
                >
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : 'cursor-default'
                  } ${index === data.length - 1 ? 'border-none' : ''}`}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key.toString()}
                      className={`py-4 px-6 ${col.className || ""}`}
                    >
                      {col.render ? col.render(row, index) : (row[col.key as keyof T] as any)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && <div className="pt-4">{pagination}</div>}
    </div>
  )
}
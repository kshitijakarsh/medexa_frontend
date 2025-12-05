"use client";

import { Eye } from "lucide-react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@workspace/ui/components/table";

type RadiologyItem = {
  id: number;
  procedure: string;
  bodyPart?: string;
  urgency?: string;
  orderedDate?: string;
  status?: string;
};

export default function RadiologyTable({
  data,
  onView,
}: {
  data: RadiologyItem[];
  onView?: (item: RadiologyItem) => void;
}) {
  const urgencyClass = (u?: string) => {
    switch ((u || "").toLowerCase()) {
      case "urgent":
        return "text-orange-500";
      case "stat":
        return "text-red-500";
      default:
        return "text-sky-600";
    }
  };

  const statusBadge = (s?: string) => {
    switch ((s || "").toLowerCase()) {
      case "completed":
        return (
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
            Completed
          </span>
        );
      case "ordered":
        return (
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs">
            Ordered
          </span>
        );
      case "cancelled":
        return (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
            {s ?? "Unknown"}
          </span>
        );
    }
  };

  const formatDate = (d?: string) => {
    if (!d) return "-";
    let dt = new Date(d);
    return isNaN(dt.getTime()) ? d : dt.toLocaleString();
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="text-gray-500">
            <TableHead className="py-3 pl-4 w-12">Sl No</TableHead>
            <TableHead className="py-3">Procedure</TableHead>
            <TableHead className="py-3">Body Part</TableHead>
            <TableHead className="py-3">Urgency</TableHead>
            <TableHead className="py-3">Ordered Date</TableHead>
            <TableHead className="py-3">Status</TableHead>
            <TableHead className="py-3 text-center w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={row.id}
              className="bg-white even:bg-blue-50/30 border-t"
            >
              <TableCell className="py-4 pl-4">{i + 1}</TableCell>

              <TableCell className="text-blue-600 underline">
                {row.procedure}
              </TableCell>

              <TableCell>
                <span className="inline-block bg-white border px-3 py-1 rounded-full text-xs">
                  {row.bodyPart ?? "-"}
                </span>
              </TableCell>

              <TableCell className={urgencyClass(row.urgency)}>
                {row.urgency ?? "-"}
              </TableCell>

              <TableCell>{formatDate(row.orderedDate)}</TableCell>

              <TableCell>{statusBadge(row.status)}</TableCell>

              <TableCell className="text-center">
                <button
                  onClick={() => onView?.(row)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100"
                >
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                className="py-6 text-center text-gray-500"
                colSpan={7}
              >
                
                No radiology orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

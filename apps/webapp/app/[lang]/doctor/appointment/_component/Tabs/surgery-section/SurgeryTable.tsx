"use client";

import { Eye } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@workspace/ui/components/table";

export default function SurgeryTable({ data, onView }) {
  const urgencyColor = (u) => {
    switch (u.toLowerCase()) {
      case "urgent":
        return "text-orange-500";
      case "emergency":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  const statusChip = (s) => {
    switch (s.toLowerCase()) {
      case "completed":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
            Completed
          </span>
        );
      case "ordered":
        return (
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
            Ordered
          </span>
        );
      default:
        return s;
    }
  };

  return (
    <Table className="w-full text-sm">
      <TableHeader>
        <TableRow className="text-gray-500">
          <TableHead>Sl No</TableHead>
          <TableHead>Surgery Type</TableHead>
          <TableHead>Surgery Category</TableHead>
          <TableHead>Urgency</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, i) => (
          <TableRow key={item.id} className="even:bg-blue-50/30">
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell className={urgencyColor(item.urgency)}>
              {item.urgency}
            </TableCell>
            <TableCell>{statusChip(item.status)}</TableCell>

            <TableCell className="text-center">
              <button
                onClick={() => onView(item)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Eye className="w-4 h-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

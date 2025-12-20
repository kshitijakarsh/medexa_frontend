// export default function LaboratoryTable({ data }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="text-gray-500">
//             <th className="py-3 pl-4">Sl No</th>
//             <th className="py-3">Test Name</th>
//             <th className="py-3">Urgency</th>
//             <th className="py-3">Ordered Date</th>
//             <th className="py-3">Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((item, i) => (
//             <tr key={item.id} className="even:bg-blue-50/30">
//               <td className="py-3 pl-4">{i + 1}</td>
//               <td>{item.test}</td>
//               <td>{item.urgency}</td>
//               <td>{new Date().toISOString().slice(0, 16).replace("T", " ")}</td>
//               <td>
//                 <span className="bg-orange-200 px-3 py-1 rounded-full">
//                   Ordered
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@workspace/ui/components/table";

export type LabOrder = {
  id: number;
  test: string;
  urgency: string;
  orderedDate: string;
  status: string;
};

interface LaboratoryTableProps {
  data: LabOrder[];
}

export default function LaboratoryTable({ data } : LaboratoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="text-gray-500">
            <TableHead className="py-3 pl-4">Sl No</TableHead>
            <TableHead className="py-3">Test Name</TableHead>
            <TableHead className="py-3">Urgency</TableHead>
            <TableHead className="py-3">Ordered Date</TableHead>
            <TableHead className="py-3">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, i) => (
            <TableRow key={item.id} className="even:bg-blue-50/30">
              <TableCell className="py-3 pl-4">{i + 1}</TableCell>
              <TableCell>{item.test}</TableCell>
              <TableCell>{item.urgency}</TableCell>

              <TableCell>
                {new Date().toISOString().slice(0, 16).replace("T", " ")}
              </TableCell>

              <TableCell>
                <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs">
                  Ordered
                </span>
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                className="text-center py-6 text-gray-500"
                colSpan={5}
              >
                No laboratory tests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

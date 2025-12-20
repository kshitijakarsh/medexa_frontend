// "use client";

// import { StatusPill } from "../ui/StatusPill";
// import { TypeBadge } from "../ui/TypeBadge";
// import { PatientCell } from "./PatientCell";

// export function AppointmentTableRow({ r, idx }: any) {
//   return (
//     <tr className={idx % 2 === 0 ? "bg-[#F6FBFF]" : ""}>
//       <td className="py-4">{r.token}</td>

//       <td>
//         <PatientCell name={r.name} mrn={r.mrn} avatar={r.avatar} />
//       </td>

//       <td>{r.time}</td>

//       <td>{r.diagnosis}</td>

//       <td>
//         <TypeBadge type={r.type} />
//       </td>

//       <td>
//         <StatusPill status={r.status} />
//       </td>
//     </tr>
//   );
// }



"use client";

import { TableRow, TableCell } from "@workspace/ui/components/table";
import { PatientCell } from "./PatientCell";
import { StatusPill } from "../../../../../../components/common/pasient-card/status-pill";
import { TypeBadge } from "../../../../../../components/common/pasient-card/type-badge";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useLocaleRoute } from "@/app/hooks/use-locale-route";

export function AppointmentTableRow({ r, idx }: any) {
  const router = useRouter()
    const { withLocale } = useLocaleRoute()
    // console.log(r)
  
  return (
    <TableRow className={`cursor-pointer ${idx % 2 === 0 ? "bg-[#F6FBFF]" : "bg-white"}`} onClick={() => router.push(`${withLocale(ROUTES.NURSE_APPOINTMENT_SCREENING)}${r.token}`)}>
      <TableCell className="py-4">{r.token}</TableCell>

      <TableCell>
        <PatientCell name={r.name} mrn={r.mrn} avatar={r.avatar} />
      </TableCell>

      <TableCell>{r.time}</TableCell>

      <TableCell>{r.diagnosis}</TableCell>

      <TableCell>
        <TypeBadge type={r.type} />
      </TableCell>

      <TableCell>
        <StatusPill status={r.status} />
      </TableCell>
    </TableRow>
  );
}

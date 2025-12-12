// import { AppointmentItem } from "../types/appointment";

// export function mapVisitToAppointmentItem(visit: any): AppointmentItem {
//   return {
//     id: visit.id,
//     name: `${visit.patient?.first_name || ""} ${visit.patient?.last_name || ""}`.trim(),
//     mrn: visit.patient?.civil_id || "-",
//     avatar: "",

//     time: visit.time_slot || "",
//     status: visit.status || "",

//     // OPTIONAL FIELDS
//     insurance: visit.charges?.[0]?.status || "",
//     insuranceName: visit.tenant?.name_en || "",
//     note: "",
//     age: "",
//     phone: visit.patient?.mobile_number || "",

//     type: visit.visit_type || "",
//     details: visit.department?.name || "",
//   };
// }


import { calculateAge } from "@/app/utils/age";
import { AppointmentItem } from "../types/appointment";

export function mapVisitToAppointmentItem(visit: any): AppointmentItem {
  return {
    id: String(visit.id),

    patient_id: visit.patient_id,

    // Name
    name: `${visit.patient?.first_name || ""} ${visit.patient?.last_name || ""}`.trim(),

    // MRN
    mrn: visit.patient?.civil_id || "-",

    // Avatar placeholder
    avatar: visit.patient.avatar || "",

    // Time
    time: visit.time_slot || "",

    // Status
    status: visit.status || "",

    // Visit type
    type: visit.visit_type || "",

    // Room text
    room: visit.machine_room
      ? `Room ${visit.machine_room}`
      : "Not Assigned",

    // Insurance + tenant
    insurance: visit.charges?.[0]?.status || "",
    insuranceName: visit.tenant?.insuranceName || "",

    // Optional fields
    note: "",
    age: calculateAge(visit.patient?.dob) || "",
    phone: visit.patient?.mobile_number || "",
    permanent_address: visit.patient?.permanent_address || "",

    // Department name
    details: visit.department?.department_name || "",
  };
}

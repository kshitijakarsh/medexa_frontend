import { IPDItem } from "./ipd-api";
import { IPDEntry } from "@/app/[lang]/frontoffice/IPD/types";

/**
 * Maps API IPD response to IPDEntry format used by the UI
 */
export function mapIPDToEntry(ipd: IPDItem): IPDEntry {
    // Format date from ISO string to DD-MM-YYYY
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Format time from ISO string to HH:MM AM/PM
    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes} ${ampm}`;
    };

    // Build location string: Floor - Ward - Bed
    const location = ipd.ward?.ward_number && ipd.bed?.bed_number
        ? `${ipd.ward.ward_number} - ${ipd.bed.bed_number}`
        : ipd.ward?.ward_number || ipd.bed?.bed_number || "-";

    // Determine status based on admission type and other factors
    // This is a simplified mapping - you may need to adjust based on actual business logic
    const getStatus = (): IPDEntry["status"] => {
        // If there's a status field in the API response, use it
        // For now, defaulting based on admission_type
        if (ipd.admission_type === "emergency") {
            return "Critical";
        }
        return "Stable";
    };

    // Build patient name
    const patientName = `${ipd.patient?.first_name || ""} ${ipd.patient?.last_name || ""}`.trim();

    // Build doctor name
    const doctorName = ipd.doctor?.name || "";

    // Build MRN - using patient_id (format: MRN-{id})
    const mrn = `MRN-${ipd.patient_id}`;

    // Build IPD ID
    const ipdId = `IPD ID-${ipd.id}`;

    return {
        id: ipd.id,
        bedNo: ipd.bed?.bed_number || "-",
        patientName: patientName || "Unknown Patient",
        mrn: mrn,
        ipdId: ipdId,
        patientImg: "", // API doesn't provide patient image URL in the response
        doctorName: doctorName || "Unknown Doctor",
        specialty: ipd.department?.department_name || "",
        admissionDate: formatDate(ipd.date),
        time: formatTime(ipd.date),
        location: location,
        bill: "0 AED", // API doesn't provide bill amount in the response
        status: getStatus(),
    };
}


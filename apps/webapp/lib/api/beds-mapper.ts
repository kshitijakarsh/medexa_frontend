import { BedItem } from "./frontoffice-beds-api";
import { BedData } from "@/app/[lang]/frontoffice/IPD/components/bed-management/mock-data";
import { IPDItem } from "./ipd-api";

/**
 * Maps API Bed response to BedData format used by the UI
 * Also uses IPD data to determine if a bed is occupied
 */
export function mapBedToBedData(
    bed: BedItem,
    ipdData?: IPDItem[]
): BedData {
    // Find if this bed is occupied by checking IPD data
    const occupiedIPD = ipdData?.find((ipd) => ipd.bed_id === bed.id);

    // Map API status to UI status
    // API status: "active" | "inactive" (or other values from the API)
    // UI status: "Occupied" | "Vacant" | "Reserved" | "Blocked" | "Cleaning"
    const getStatus = (): BedData["status"] => {
        if (occupiedIPD) {
            return "Occupied";
        }
        
        // Map API status to UI status
        // You may need to adjust this based on actual API response values
        if (bed.status === "blocked") {
            return "Blocked";
        }
        if (bed.status === "reserved") {
            return "Reserved";
        }
        if (bed.status === "cleaning") {
            return "Cleaning";
        }
        
        // Default to Vacant if bed is active and not occupied
        return "Vacant";
    };

    const status = getStatus();

    // Format date from ISO string to DD-MM-YYYY
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const bedData: BedData = {
        id: bed.id,
        bedNumber: bed.bed_number,
        status: status,
    };

    // If bed is occupied, add patient details from IPD data
    if (occupiedIPD && status === "Occupied") {
        const patientName = `${occupiedIPD.patient?.first_name || ""} ${occupiedIPD.patient?.last_name || ""}`.trim();
        const doctorName = occupiedIPD.doctor?.name || "";
        
        bedData.patientName = patientName || "Unknown Patient";
        bedData.mrn = `MRN-${occupiedIPD.patient_id}`;
        bedData.doctorName = doctorName ? `Dr. ${doctorName}` : "Unknown Doctor";
        bedData.admissionDate = formatDate(occupiedIPD.date);
        
        // Calculate expected discharge date (admission date + expected_days)
        if (occupiedIPD.expected_days) {
            const admissionDate = new Date(occupiedIPD.date);
            const dischargeDate = new Date(admissionDate);
            dischargeDate.setDate(dischargeDate.getDate() + occupiedIPD.expected_days);
            bedData.expectedDischargeDate = formatDate(dischargeDate.toISOString());
        }
        
        // Determine if critical based on admission type
        bedData.isCritical = occupiedIPD.admission_type === "emergency";
    }

    // If bed is blocked, you might want to add a reason
    // This would need to come from the API or be stored separately
    if (status === "Blocked") {
        bedData.reason = "Equipment Issue"; // Default, should come from API if available
    }

    return bedData;
}


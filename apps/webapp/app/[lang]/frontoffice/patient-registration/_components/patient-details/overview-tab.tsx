"use client"

import { LastVisitSection } from "./sections/last-visit-section"
import { UpcomingAppointmentsSection } from "./sections/upcoming-appointments-section"
import { RecentDiagnosesSection } from "./sections/recent-diagnoses-section"
import { ActiveOrdersSection } from "./sections/active-orders-section"
import type { PatientDetails } from "./types"

interface OverviewTabProps {
    patient: PatientDetails
}

export function OverviewTab({ patient }: OverviewTabProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-8">
            <LastVisitSection visit={patient.lastVisit} />
            <UpcomingAppointmentsSection appointments={patient.upcomingAppointments} />
            <RecentDiagnosesSection diagnoses={patient.diagnoses} />
            <ActiveOrdersSection orders={patient.activeOrders} />
        </div>
    )
}

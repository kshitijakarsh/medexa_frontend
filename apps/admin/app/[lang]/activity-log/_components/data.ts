export type AuditLogType =
  | "Create"
  | "Update"
  | "HIE"
  | "Admin"
  | "Suspend"
  | "Login"
  | "System"

export type AuditLogStatus = "Success" | "Failed"

export type AuditLog = {
  id: string
  action: string
  performedBy: string
  hospital: string
  type: AuditLogType
  status: AuditLogStatus
  timestamp: string // ISO timestamp
}

function iso(minutesAgo: number): string {
  const d = new Date(Date.now() - minutesAgo * 60 * 1000)
  return d.toISOString()
}

export const AUDIT_LOGS: AuditLog[] = [
  {
    id: "1",
    action: "Added new hospital",
    performedBy: "Super Admin",
    hospital: "Al Hayat Clinic",
    type: "Create",
    status: "Success",
    timestamp: iso(5),
  },
  {
    id: "2",
    action: "Module configuration updated",
    performedBy: "Super Admin",
    hospital: "Doha Medical Center",
    type: "Update",
    status: "Success",
    timestamp: iso(12),
  },
  {
    id: "3",
    action: "HIE sync failed",
    performedBy: "System",
    hospital: "Al Noor Hospital",
    type: "HIE",
    status: "Failed",
    timestamp: iso(22),
  },
  {
    id: "4",
    action: "New admin user added",
    performedBy: "Super Admin",
    hospital: "Al Rayyan Health Center",
    type: "Admin",
    status: "Success",
    timestamp: iso(37),
  },
  {
    id: "5",
    action: "Hospital account suspended",
    performedBy: "Super Admin",
    hospital: "MediQ Hospital",
    type: "Suspend",
    status: "Success",
    timestamp: iso(49),
  },
  {
    id: "6",
    action: "Admin login attempt failed",
    performedBy: "Dr. Ahmed Al-Mansouri",
    hospital: "Al Hayat Medical Center",
    type: "Login",
    status: "Failed",
    timestamp: iso(63),
  },
  {
    id: "7",
    action: "HIE sync completed successfully",
    performedBy: "System",
    hospital: "Doha General Hospital",
    type: "HIE",
    status: "Success",
    timestamp: iso(78),
  },
  {
    id: "8",
    action: "Hospital information updated",
    performedBy: "Super Admin",
    hospital: "Qatar Medical Center",
    type: "Update",
    status: "Success",
    timestamp: iso(105),
  },
  {
    id: "9",
    action: "System maintenance completed",
    performedBy: "System",
    hospital: "All Hospitals",
    type: "System",
    status: "Success",
    timestamp: iso(140),
  },
  {
    id: "10",
    action: "Hospital reactivated",
    performedBy: "Super Admin",
    hospital: "Al Wakra Medical Complex",
    type: "Update",
    status: "Success",
    timestamp: iso(180),
  },
]

export function getRecentLogs(limit = 10): AuditLog[] {
  return [...AUDIT_LOGS]
    .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
    .slice(0, limit)
}

export function summarizeLogs(logs: AuditLog[]) {
  const total = logs.length
  const success = logs.filter((l) => l.status === "Success").length
  const failed = logs.filter((l) => l.status === "Failed").length
  const hospitals = new Set(logs.map((l) => l.hospital)).size
  return { total, success, failed, hospitals }
}

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
  description?: string
  ipAddress?: string
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
    description: "Hospital onboarded with default modules assigned.",
    ipAddress: "192.168.1.15",
  },
  {
    id: "2",
    action: "Module configuration updated",
    performedBy: "Super Admin",
    hospital: "Doha Medical Center",
    type: "Update",
    status: "Success",
    timestamp: iso(12),
    description: "Enabled Radiology module and updated permissions.",
    ipAddress: "192.168.1.20",
  },
  {
    id: "3",
    action: "HIE sync failed",
    performedBy: "System",
    hospital: "Al Noor Hospital",
    type: "HIE",
    status: "Failed",
    timestamp: iso(22),
    description: "Timeout while pushing batch to HIE gateway.",
    ipAddress: "10.10.0.5",
  },
  {
    id: "4",
    action: "New admin user added",
    performedBy: "Super Admin",
    hospital: "Al Rayyan Health Center",
    type: "Admin",
    status: "Success",
    timestamp: iso(37),
    description: "Created new admin user with limited privileges.",
    ipAddress: "172.16.0.2",
  },
  {
    id: "5",
    action: "Hospital account suspended",
    performedBy: "Super Admin",
    hospital: "MediQ Hospital",
    type: "Suspend",
    status: "Success",
    timestamp: iso(49),
    description: "Suspended due to billing issues.",
    ipAddress: "172.16.0.3",
  },
  {
    id: "6",
    action: "Admin login attempt failed",
    performedBy: "Dr. Ahmed Al-Mansouri",
    hospital: "Al Hayat Medical Center",
    type: "Login",
    status: "Failed",
    timestamp: iso(63),
    description: "Invalid password provided during login attempt.",
    ipAddress: "203.0.113.45",
  },
  {
    id: "7",
    action: "HIE sync completed successfully",
    performedBy: "System",
    hospital: "Doha General Hospital",
    type: "HIE",
    status: "Success",
    timestamp: iso(78),
    description: "Completed daily HIE synchronization.",
    ipAddress: "10.10.0.5",
  },
  {
    id: "8",
    action: "Hospital information updated",
    performedBy: "Super Admin",
    hospital: "Qatar Medical Center",
    type: "Update",
    status: "Success",
    timestamp: iso(105),
    description: "Updated hospital contact information.",
    ipAddress: "192.168.1.33",
  },
  {
    id: "9",
    action: "System maintenance completed",
    performedBy: "System",
    hospital: "All Hospitals",
    type: "System",
    status: "Success",
    timestamp: iso(140),
    description: "Planned maintenance completed without incidents.",
    ipAddress: "127.0.0.1",
  },
  {
    id: "10",
    action: "Hospital reactivated",
    performedBy: "Super Admin",
    hospital: "Al Wakra Medical Complex",
    type: "Update",
    status: "Success",
    timestamp: iso(180),
    description: "Reactivated subscription after payment.",
    ipAddress: "192.168.1.55",
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

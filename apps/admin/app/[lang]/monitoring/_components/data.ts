export type ServiceStatus = "operational" | "degraded" | "down"

export type Service = {
  name: string
  status: ServiceStatus
  uptime: string
  lastChecked: string
}

export type ResourceMetric = {
  name: string
  value: number // percentage
  status: "good" | "warning" | "critical"
}

export type DatabaseMetric = {
  name: string
  value: string
  status: "good" | "warning" | "critical"
}

export type NetworkMetric = {
  label: string
  value: string
  trend: string
  trendType: "up" | "down" | "neutral"
}

// Server Resources
export const SERVER_RESOURCES: ResourceMetric[] = [
  { name: "CPU Usage", value: 27, status: "good" },
  { name: "Memory Usage", value: 68, status: "warning" },
  { name: "Disk Usage", value: 72, status: "warning" },
  { name: "Network I/O", value: 22, status: "good" },
]

// Service Status
export const SERVICES: Service[] = [
  {
    name: "API Gateway",
    status: "operational",
    uptime: "99.99%",
    lastChecked: "30s ago",
  },
  {
    name: "Database Primary",
    status: "operational",
    uptime: "99.97%",
    lastChecked: "1m ago",
  },
  {
    name: "Database Replica",
    status: "operational",
    uptime: "99.95%",
    lastChecked: "1m ago",
  },
  {
    name: "Cache Server",
    status: "operational",
    uptime: "99.98%",
    lastChecked: "45s ago",
  },
  {
    name: "File Storage",
    status: "operational",
    uptime: "100%",
    lastChecked: "2m ago",
  },
  {
    name: "Email Service",
    status: "operational",
    uptime: "99.94%",
    lastChecked: "1m ago",
  },
]

// Database Health
export const DATABASE_HEALTH: DatabaseMetric[] = [
  { name: "Active Connections", value: "487 / 1000", status: "good" },
  { name: "Query Performance", value: "Excellent", status: "good" },
  { name: "Replication Lag", value: "0.02s", status: "good" },
  { name: "Backup Status", value: "Up to date", status: "good" },
]

// Network Activity
export const NETWORK_ACTIVITY: NetworkMetric[] = [
  {
    label: "Incoming Traffic",
    value: "245.3 MB/s",
    trend: "12% from avg",
    trendType: "up",
  },
  {
    label: "Outgoing Traffic",
    value: "189.7 MB/s",
    trend: "Normal",
    trendType: "neutral",
  },
  {
    label: "Total Requests",
    value: "45.2K/min",
    trend: "8% from avg",
    trendType: "up",
  },
]

// Overview Metrics
export const OVERVIEW_METRICS = {
  systemUptime: "99.98%",
  activeHospitals: 28,
  concurrentUsers: 1247,
  avgApiResponseTime: "124ms",
}

export function getResourceColor(value: number): string {
  if (value < 50) return "bg-emerald-500"
  if (value < 80) return "bg-yellow-500"
  return "bg-orange-500"
}

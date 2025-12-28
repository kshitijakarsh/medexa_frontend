export const ADMINISTRATION_BASE = "/administration"
export const DOCTOR_BASE = `/doctor`
export const FRONTOFFICE_BASE = "/frontoffice"
export const HR = "/hr"

export const ROUTES = {
  ORGANIZATION: `/organization-setup`,
  ADMINISTRATION: ADMINISTRATION_BASE,
  ADMINISTRATION_CHARGES: `${ADMINISTRATION_BASE}/charges`,
  ADMINISTRATION_CHARGES_ADD: `${ADMINISTRATION_BASE}/charges/add`,
  ADMINISTRATION_DEPARTMENT: `${ADMINISTRATION_BASE}/department`,
  ADMINISTRATION_INSURANCE: `${ADMINISTRATION_BASE}/insurance`,
  ADMINISTRATION_INSURANCE_ADD: `${ADMINISTRATION_BASE}/insurance/add`,
  ADMINISTRATION_OPERATION: `${ADMINISTRATION_BASE}/operation`,
  ADMINISTRATION_OPERATION_THEATRES: `${ADMINISTRATION_BASE}/operation-theatres`,
  ADMINISTRATION_ROLES: `${ADMINISTRATION_BASE}/roles`,
  ADMINISTRATION_ROLES_PERMISSIONS: `${ADMINISTRATION_BASE}/roles/permissions`,
  ADMINISTRATION_UNITS_WARDS_BEDS: `${ADMINISTRATION_BASE}/units-wards-beds`,
  ADMINISTRATION_USER: `${ADMINISTRATION_BASE}/user`,

  // Doctor 
  DOCTOR_DASHBOARD: `${DOCTOR_BASE}/dashboard`,
  DOCTOR_VIEW_ALL: `${DOCTOR_BASE}/dashboard/view-all`,
  DOCTOR_APPOINTMENT_SCREENING: `${DOCTOR_BASE}/appointment/`,
  DOCTOR_SCREENING_VISIT_PURPOSE_HISTORY_VIEW: `/visit-purpose/history/`,
  DOCTOR_SCREENING_SOAP_NOTE_HISTORY_VIEW: `/soap-note/history/`,
  DOCTOR_SCREENING_NURSE_NOTE_HISTORY_VIEW: `/nurse-notes/history/`,
  DOCTOR_SCREENING_VITALS_HISTORY_VIEW: `/vitals/history/`,
  DOCTOR_SCREENING_ATTACHMENT_HISTORY_VIEW: `/attachment/history/`,

  DOCTOR_SCHEDULE: `${DOCTOR_BASE}/schedule`,
  DOCTOR_TIME_SLOTS: `${DOCTOR_BASE}/time-slots`,

  DOCTOR_PROFILE: `${DOCTOR_BASE}/profile`,
  DOCTOR_PROFILE_SOAP_NOTE_TEMPLATE_CREATE: `${DOCTOR_BASE}/profile/soap/create`,
  DOCTOR_PROFILE_SOAP_NOTE_TEMPLATE: `${DOCTOR_BASE}/profile/soap/`,
  DOCTOR_PROFILE_SOAP_NOTE_TEMPLATE_EDIT: `/edit`,


  FRONTOFFICE_DASHBOARD: `${FRONTOFFICE_BASE}/dashboard`,
  FRONTOFFICE_SCHEDULE: `${FRONTOFFICE_BASE}/schedule`,
  FRONTOFFICE_TIME_SLOTS: `${FRONTOFFICE_BASE}/time-slots`,
  FRONTOFFICE_PATIENT_REGISTRATION: `${FRONTOFFICE_BASE}/patient-registration`,
  FRONTOFFICE_OPD: `${FRONTOFFICE_BASE}/OPD`,
  FRONTOFFICE_IPD: `${FRONTOFFICE_BASE}/IPD`,


  // HR
  HR: `${HR}/employee-configuration`,
  HR_EMPLOYEE_ADD: `${HR}/employee-configuration/add`,
}

// Build URL with query parameters
export function buildUrl(path: string, params?: Record<string, any>) {
  if (!params) return path

  const query = new URLSearchParams(params).toString()
  return `${path}?${query}`
}

// 🔹 All doctor tabs at one place
export const DoctorTabs: [
  { key: string; label: string },
  ...Array<{ key: string; label: string }>,
] = [
    { key: "all", label: "All" },
    { key: "emergency", label: "Emergency Appointments" },
    { key: "vip", label: "VIP Appointments" },
    { key: "follow", label: "Follow Up" },
    { key: "standard", label: "Standard Appointments" },
  ]

// Only these 3 should show in Dashboard Table
export const DoctorHomeTabKeys = ["all", "vip", "follow"] as const

export type DoctorHomeTabKey = (typeof DoctorHomeTabKeys)[number]

// 4. Filtered home tab list (correct typing)
export const DoctorHomeTabs = DoctorTabs.filter(
  (t): t is { key: DoctorHomeTabKey; label: string } =>
    DoctorHomeTabKeys.includes(t.key as DoctorHomeTabKey)
)

// 🔹 Extract only keys (for validation)
export const DoctorTabKeys = DoctorTabs.map((t) => t.key)

// 🔹 Default tab
export const DOCTOR_DEFAULT_TAB = DoctorTabs[0].key // "all"

// 🔹 Validate a tab (return safe value)
export function validateDoctorTab(tab: string | null): string {
  if (!tab || !DoctorTabKeys.includes(tab)) {
    return DOCTOR_DEFAULT_TAB
  }
  return tab
}

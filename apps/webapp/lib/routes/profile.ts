import { ROUTES } from "@/lib/routes"

export const MODULE_PROFILE_ROUTES = {
  doctor: ROUTES.DOCTOR_PROFILE,
//   hr: ROUTES.HR.replace("/employee-configuration", "/profile"),
//   administration: "/administration/profile",
//   frontoffice: "/frontoffice/profile",
administration: ROUTES.ADMINISTRATION_PROFILE,
} as const

export type ModuleKey = keyof typeof MODULE_PROFILE_ROUTES

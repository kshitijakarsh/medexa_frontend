export const WORKING_VISIT_STATUSES = [
  "in_consultation",
  "in_progress",
  "lab_test",
  "radiology",
//   "active",
];

export function canWorkOnVisit(status?: string) {
  return status ? WORKING_VISIT_STATUSES.includes(status) : false;
}

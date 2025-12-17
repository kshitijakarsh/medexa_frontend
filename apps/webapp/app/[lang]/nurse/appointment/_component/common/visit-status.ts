// lib/constants/visit-status.ts
export const VISIT_STATUSES = {
    SCHEDULED: "scheduled",
    IN_CONSULTATION: "in_consultation",
    IN_PROGRESS: "in_progress",
    LAB_TEST: "lab_test",
    RADIOLOGY: "radiology",
    COMPLETED: "completed",
};

export const STATUS_LABELS: Record<string, string> = {
    scheduled: "Scheduled",
    in_consultation: "In Consultation",
    in_progress: "In Progress",
    lab_test: "Lab Test",
    radiology: "Radiology",
    active: "Active"
    //   completed: "Completed",
};

// Allowed transitions from each status
export const STATUS_TRANSITIONS: Record<string, string[]> = {
    active: ["in_consultation"],
    in_consultation: ["in_progress", "lab_test", "radiology",],
    in_progress: ["lab_test", "radiology", "in_consultation"],
    lab_test: ["in_progress",],
    radiology: ["in_progress",],
    completed: [],
};

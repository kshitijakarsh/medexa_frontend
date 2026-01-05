export const PERMISSIONS = {
    DEPARTMENT: {
        CREATE: "administration:department:create",
        EDIT: "administration:department:edit",
        DELETE: "administration:department:delete",
        VIEW: "administration:department:view",
    },
    WARD: {
        CREATE: "administration:ward:create",
        EDIT: "administration:ward:edit",
        DELETE: "administration:ward:delete",
        VIEW: "administration:ward:view",
    },
    BED_TYPE: {
        CREATE: "administration:bedType:create",
        EDIT: "administration:bedType:edit",
        DELETE: "administration:bedType:delete",
        VIEW: "administration:bedType:view",
    },
    WARD_TYPE: {
        CREATE: "administration:wardType:create",
        EDIT: "administration:wardType:edit",
        DELETE: "administration:wardType:delete",
        VIEW: "administration:wardType:view",
    },
    PATIENTS: {
        CREATE: "administration:patientCategory:create",
        EDIT: "administration:patientCategory:edit",
        DELETE: "administration:patientCategory:delete",
        VIEW: "administration:patientCategory:view",
    },
    FLOOR: {
        CREATE: "administration:floor:create",
        EDIT: "administration:floor:edit",
        DELETE: "administration:floor:delete",
        VIEW: "administration:floor:view",
    },
    ROLE: {
        CREATE: "administration:role:create",
        PERMISSION: "administration:role:permission_manage",
        EDIT: "administration:role:edit",
        DELETE: "administration:role:delete",
        VIEW: "administration:role:view",
    },
    INSURANCE: {
        CREATE: "administration:insurance:create",
        EDIT: "administration:insurance:edit",
        DELETE: "administration:insurance:delete",
        VIEW: "administration:insurance:view",
    },
    SERVICE: {
        CREATE: "administration:service:create",
        EDIT: "administration:service:edit",
        DELETE: "administration:service:delete",
        VIEW: "administration:service:view",
    },
    CATEGORY: {
        CREATE: "administration:category:create",
        EDIT: "administration:category:edit",
        DELETE: "administration:category:delete",
        VIEW: "administration:category:view",
    },
    TAX: {
        CREATE: "administration:tax:create",
        EDIT: "administration:tax:edit",
        DELETE: "administration:tax:delete",
        VIEW: "administration:tax:view",
    },
    UNIT: {
        CREATE: "administration:unit:create",
        EDIT: "administration:unit:edit",
        DELETE: "administration:unit:delete",
        VIEW: "administration:unit:view",
    },
    CHARGE: {
        CREATE: "administration:charge:create",
        EDIT: "administration:charge:edit",
        DELETE: "administration:charge:delete",
        VIEW: "administration:charge:view",
        VIEW_ONE: "administration:charge:viewOne",
    },
    CHARGE_CATEGORY: {
        CREATE: "administration:chargeCategory:create",
        EDIT: "administration:chargeCategory:edit",
        DELETE: "administration:chargeCategory:delete",
        VIEW: "administration:chargeCategory:view",
    },
    CHARGE_UNIT: {
        CREATE: "administration:chargeUnit:create",
        EDIT: "administration:chargeUnit:edit",
        DELETE: "administration:chargeUnit:delete",
        VIEW: "administration:chargeUnit:view",
    },
    TAX_CATEGORY: {
        CREATE: "administration:taxCategory:create",
        EDIT: "administration:taxCategory:edit",
        DELETE: "administration:taxCategory:delete",
        VIEW: "administration:taxCategory:view",
    },
    OPERATION_THEATRES: {
        CREATE: "administration:operationTheatres:create",
        EDIT: "administration:operationTheatres:edit",
        DELETE: "administration:operationTheatres:delete",
        VIEW: "administration:operationTheatres:view",
        VIEW_ONE: "administration:operationTheatres:viewOne",
    },
    OPERATION: {
        CREATE: "administration:operation:create",
        EDIT: "administration:operation:edit",
        DELETE: "administration:operation:delete",
        VIEW: "administration:operation:view",
        VIEW_ONE: "administration:operation:viewOne",
    },
    OPERATION_CATEGORY: {
        CREATE: "administration:operationCategory:create",
        EDIT: "administration:operationCategory:edit",
        DELETE: "administration:operationCategory:delete",
        VIEW: "administration:operationCategory:view",
        VIEW_ONE: "administration:operationCategory:viewOne",
    },
    USER: {
        CREATE: "administration:user:create",
        EDIT: "administration:user:edit",
        DELETE: "administration:user:delete",
        VIEW: "administration:user:view",
        VIEW_ONE: "administration:user:viewOne",
    },

    // Doctors
    DOCTOR: {
        USERS: {
            VIEW: "doctor:users:view",
        },

        VITALS: {
            VIEW: "doctor:vitals:view",
            VIEW_ONE: "doctor:vitals:viewOne",
            CREATE: "doctor:vitals:create",
            EDIT: "doctor:vitals:edit",
            DELETE: "doctor:vitals:delete",
        },

        VISIT_PURPOSE: {
            VIEW: "doctor:visit_purpose:view",
            VIEW_ONE: "doctor:visit_purpose:viewOne",
            CREATE: "doctor:visit_purpose:create",
            EDIT: "doctor:visit_purpose:edit",
            DELETE: "doctor:visit_purpose:delete",
        },

        SOAP_TEMPLATES: {
            VIEW: "doctor:soap_templates:view",
            VIEW_ONE: "doctor:soap_templates:viewOne",
            CREATE: "doctor:soap_templates:create",
            UPDATE: "doctor:soap_templates:update",
            DELETE: "doctor:soap_templates:delete",
        },

        SOAP_NOTES: {
            VIEW: "doctor:soap_notes:view",
            VIEW_ONE: "doctor:soap_notes:viewOne",
            CREATE: "doctor:soap_notes:create",
            EDIT: "doctor:soap_notes:edit",
            DELETE: "doctor:soap_notes:delete",
        },

        NURSE_ORDERS: {
            VIEW: "doctor:nurse_orders:view",
            VIEW_ONE: "doctor:nurse_orders:viewOne",
            CREATE: "doctor:nurse_orders:create",
            EDIT: "doctor:nurse_orders:edit",
            DELETE: "doctor:nurse_orders:delete",
        },

        NURSE_NOTES: {
            VIEW: "doctor:nurse_notes:view",
            VIEW_ONE: "doctor:nurse_notes:viewOne",
            CREATE: "doctor:nurse_notes:create",
            EDIT: "doctor:nurse_notes:edit",
            DELETE: "doctor:nurse_notes:delete",
        },

        MEDICATIONS: {
            VIEW: "doctor:medications:view",
            VIEW_ONE: "doctor:medications:viewOne",
            CREATE: "doctor:medications:create",
            EDIT: "doctor:medications:edit",
            DELETE: "doctor:medications:delete",
        },

        MEDICAL_HISTORY: {
            VIEW: "doctor:medical_history:view",
            VIEW_ONE: "doctor:medical_history:viewOne",
            CREATE: "doctor:medical_history:create",
            EDIT: "doctor:medical_history:edit",
            DELETE: "doctor:medical_history:delete",
        },

        ATTACHMENTS: {
            VIEW: "doctor:attachments:view",
            VIEW_ONE: "doctor:attachments:viewOne",
            CREATE: "doctor:attachments:create",
            EDIT: "doctor:attachments:edit",
            DELETE: "doctor:attachments:delete",
        },

        ALLERGIES: {
            VIEW: "doctor:allergies:view",
            VIEW_ONE: "doctor:allergies:viewOne",
            CREATE: "doctor:allergies:create",
            EDIT: "doctor:allergies:edit",
            DELETE: "doctor:allergies:delete",
        },

        ADDITIONAL_OBSERVATIONS: {
            VIEW: "doctor:additional_observations:view",
            VIEW_ONE: "doctor:additional_observations:viewOne",
            CREATE: "doctor:additional_observations:create",
            EDIT: "doctor:additional_observations:edit",
            DELETE: "doctor:additional_observations:delete",
        },
        PRESCRIPTION: {
            VIEW: "doctor:prescription:view",
            VIEW_ONE: "doctor:prescription:viewOne",
            CREATE: "doctor:prescription:create",
            EDIT: "doctor:prescription:edit",
            DELETE: "doctor:prescription:delete",
        },
        DIAGNOSTIC_ORDERS: {
            VIEW: "doctor:diagnostic_orders:view",
            VIEW_ONE: "doctor:diagnostic_orders:viewOne",
            CREATE: "doctor:diagnostic_orders:create",
            EDIT: "doctor:diagnostic_orders:edit",
            DELETE: "doctor:diagnostic_orders:delete",
        },
    },
    NURSE: {
        USERS: {
            VIEW: "nurse:users:view",
        },

        VITALS: {
            VIEW: "nurse:vitals:view",
            VIEW_ONE: "nurse:vitals:viewOne",
            CREATE: "nurse:vitals:create",
            EDIT: "nurse:vitals:edit",
            DELETE: "nurse:vitals:delete",
        },

        VISIT_PURPOSE: {
            VIEW: "nurse:visit_purpose:view",
            VIEW_ONE: "nurse:visit_purpose:viewOne",
        },

        SOAP_TEMPLATES: {
            VIEW: "nurse:soap_templates:view",
            VIEW_ONE: "nurse:soap_templates:viewOne",
        },

        SOAP_NOTES: {
            VIEW: "nurse:soap_notes:view",
            VIEW_ONE: "nurse:soap_notes:viewOne",
        },

        NURSE_ORDERS: {
            VIEW: "nurse:nurse_orders:view",
            VIEW_ONE: "nurse:nurse_orders:viewOne",
        },

        NURSE_NOTES: {
            VIEW: "nurse:nurse_notes:view",
            VIEW_ONE: "nurse:nurse_notes:viewOne",
        },

        MEDICATIONS: {
            VIEW: "nurse:medications:view",
            VIEW_ONE: "nurse:medications:viewOne",
        },

        MEDICAL_HISTORY: {
            VIEW: "nurse:medical_history:view",
            VIEW_ONE: "nurse:medical_history:viewOne",
        },

        ATTACHMENTS: {
            VIEW: "nurse:attachments:view",
            VIEW_ONE: "nurse:attachments:viewOne",
        },

        ALLERGIES: {
            VIEW: "nurse:allergies:view",
            VIEW_ONE: "nurse:allergies:viewOne",
        },

        ADDITIONAL_OBSERVATIONS: {
            VIEW: "nurse:additional_observations:view",
            VIEW_ONE: "nurse:additional_observations:viewOne",
        },

    },


    // Human resources
    EMPLOYEE: {
        CREATE: "hr:employee:create",
        EDIT: "hr:employee:edit",
        DELETE: "hr:employee:delete",
        VIEW: "hr:employee:view",
        VIEW_ONE: "hr:employee:viewOne",
    },
    DESIGNATION: {
        CREATE: "hr:designation:create",
        EDIT: "hr:designation:edit",
        DELETE: "hr:designation:delete",
        VIEW: "hr:designation:view",
        VIEW_ONE: "hr:designation:viewOne",
    },
    SPECIALISATION: {
        CREATE: "hr:specialisation:create",
        EDIT: "hr:specialisation:edit",
        DELETE: "hr:specialisation:delete",
        VIEW: "hr:specialisation:view",
        VIEW_ONE: "hr:specialisation:viewOne",
    },

    TENANT: {
        VIEW_ONE: "administration:tenant:viewOne",
    },

    TENANT_MODULE: {
        VIEW: "administration:tenantModule:view",
        VIEW_ONE: "administration:tenantModule:viewOne",
    },

    SURGERY: {
        SURGERIES: {
            CREATE: "surgery:surgeries:create",
            EDIT: "surgery:surgeries:edit",
            DELETE: "surgery:surgeries:delete",
            VIEW: "surgery:surgeries:view",
            VIEW_ONE: "surgery:surgeries:viewOne",
        },
        CONSENTS: {
            CREATE: "surgery:consents:create",
            EDIT: "surgery:consents:edit",
            DELETE: "surgery:consents:delete",
            VIEW: "surgery:consents:view",
            VIEW_ONE: "surgery:consents:viewOne",
        },
        TEAMS: {
            CREATE: "surgery:surgeryTeams:create",
            EDIT: "surgery:surgeryTeams:edit",
            DELETE: "surgery:surgeryTeams:delete",
            VIEW: "surgery:surgeryTeams:view",
            VIEW_ONE: "surgery:surgeryTeams:viewOne",
        },
        NURSE_NOTES: {
            CREATE: "surgery:surgeryNurseNotes:create",
            EDIT: "surgery:surgeryNurseNotes:edit",
            DELETE: "surgery:surgeryNurseNotes:delete",
            VIEW: "surgery:surgeryNurseNotes:view",
            VIEW_ONE: "surgery:surgeryNurseNotes:viewOne",
        },
        CONSUMPTION_LOGS: {
            CREATE: "surgery:consumptionLogs:create",
            EDIT: "surgery:consumptionLogs:edit",
            DELETE: "surgery:consumptionLogs:delete",
            VIEW: "surgery:consumptionLogs:view",
            VIEW_ONE: "surgery:consumptionLogs:viewOne",
        },
        INTRAOPS: {
            CREATE: "surgery:intraops:create",
            EDIT: "surgery:intraops:edit",
            DELETE: "surgery:intraops:delete",
            VIEW: "surgery:intraops:view",
        },
        PROCEDURES: {
            CREATE: "surgery:procedures:create",
            EDIT: "surgery:procedures:edit",
            DELETE: "surgery:procedures:delete",
            VIEW: "surgery:procedures:view",
            VIEW_ONE: "surgery:procedures:viewOne",
        },
        EQUIPMENT_LOGS: {
            CREATE: "surgery:equipmentUsageLogs:create",
            EDIT: "surgery:equipmentUsageLogs:edit",
            DELETE: "surgery:equipmentUsageLogs:delete",
            VIEW: "surgery:equipmentUsageLogs:view",
            VIEW_ONE: "surgery:equipmentUsageLogs:viewOne",
        },
        CLEARANCES: {
            CREATE: "surgery:clearances:create",
            EDIT: "surgery:clearances:edit",
            DELETE: "surgery:clearances:delete",
            VIEW: "surgery:clearances:view",
            VIEW_ONE: "surgery:clearances:viewOne",
        },
        ANESTHESIA_PLANS: {
            CREATE: "surgery:anesthesiaPlans:create",
            EDIT: "surgery:anesthesiaPlans:edit",
            DELETE: "surgery:anesthesiaPlans:delete",
            VIEW: "surgery:anesthesiaPlans:view",
        },
    },
} as const;



export function hasPermission(
    userPermissions: string[] | undefined,
    permission: string
): boolean {
    if (!userPermissions) return false;
    return userPermissions.includes(permission);
}

type RawPermission =
    | string
    | {
        code?: string;
        name?: string;
        permission?: {
            module_key: string;
            name: string;
        };
    };

export function normalizePermissionList(
    permissions?: RawPermission[]
): string[] {
    if (!Array.isArray(permissions)) return [];

    return permissions
        .map((p) => {
            if (typeof p === "string") return p;

            if (p.code) return p.code;
            if (p.name) return p.name;

            if (p.permission)
                return `${p.permission.module_key}:${p.permission.name}`;

            return "";
        })
        .filter(Boolean);
}

export function hasAnyPermission(
    userPermissions: string[] | undefined,
    permissions: string[]
): boolean {
    return permissions.some((p) => hasPermission(userPermissions, p));
}

export function hasAllPermissions(
    userPermissions: string[] | undefined,
    permissions: string[]
): boolean {
    return permissions.every((p) => hasPermission(userPermissions, p));
}

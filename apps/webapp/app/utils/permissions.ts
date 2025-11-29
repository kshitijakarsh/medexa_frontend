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
    TENANT: {
        VIEW_ONE: "administration:tenant:viewOne",
    },
    USER: {
        CREATE: "administration:user:create",
        EDIT: "administration:user:edit",
        DELETE: "administration:user:delete",
        VIEW: "administration:user:view",
        VIEW_ONE: "administration:user:viewOne",
    },
    TENANT_MODULE: {
        VIEW: "administration:tenantModule:view",
        VIEW_ONE: "administration:tenantModule:viewOne",
    },
} as const;



export function hasPermission(
    userPermissions: string[] | undefined,
    permission: string
): boolean {
    if (!userPermissions) return false;
    return userPermissions.includes(permission);
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

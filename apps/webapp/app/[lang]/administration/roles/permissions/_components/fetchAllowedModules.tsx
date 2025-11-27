import { getAuthToken, getTenantFromHostname } from "@/app/utils/onboarding";
import { getTenantId } from "@/lib/api/onboarding";
import { createTenantApiClient } from "@/lib/api/tenant";
import { createModulesApiClient } from "@/lib/api/module";

export async function fetchAllowedModules() {
  const tenantSlug = getTenantFromHostname();
  if (!tenantSlug) return ["administration"];

  const token = await getAuthToken();
  const tenantId = await getTenantId(tenantSlug);

  const tenantClient = createTenantApiClient({ authToken: token });
  const modulesClient = createModulesApiClient({ authToken: token });

  const [tenantRes, modulesRes] = await Promise.all([
    tenantClient.getTenantById(tenantId),
    modulesClient.getModules(),
  ]);

  const tenant = tenantRes.data.data;
  const modules = modulesRes.data.data;
  const tenantModules = tenant.tenant_modules || [];

  const moduleMap = new Map();
  modules.forEach((m: any) => moduleMap.set(String(m.id), m));

  const dynamicKeys: string[] = [];

  tenantModules.forEach((tm: any) => {
    const moduleId = String(tm.module_id || tm.id);
    const module = moduleMap.get(moduleId);
    if (!module) return;

    dynamicKeys.push(module.module_key.toLowerCase());
  });

  // Always include admin
  return ["administration", ...dynamicKeys];
}

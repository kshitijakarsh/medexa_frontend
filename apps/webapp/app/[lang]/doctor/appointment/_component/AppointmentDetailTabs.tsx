// "use client";

// import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// import { appointmentTabsConfig } from "./appointmentTabsConfig";

// export function AppointmentDetailTabs({
//   active,
//   onChange,
//   injectedProps,
// }: {
//   active: string;
//   onChange: (tab: string) => void;
//   injectedProps: any;
// }) {

//   const tabs = appointmentTabsConfig(injectedProps);

//   return (
//     <DynamicTabs
//       tabs={tabs.map((t) => ({ key: t.key, label: t.label }))}
//       defaultTab={active}
//       onChange={onChange}
//       variant="scroll"
//     />
//   );
// }



"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { appointmentTabsConfig } from "./appointmentTabsConfig";
import { useEffect } from "react";

export function AppointmentDetailTabs({
  active,
  onChange,
  injectedProps,
}: {
  active: string;
  onChange: (tab: string) => void;
  injectedProps: any;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs = appointmentTabsConfig(injectedProps);

  /* ----------------------------------
     Hydrate tab from query on load
  ---------------------------------- */
  useEffect(() => {
    const tabFromQuery = searchParams.get("tab");
    if (tabFromQuery && tabFromQuery !== active) {
      onChange(tabFromQuery);
    }
  }, [searchParams, active, onChange]);

  /* ----------------------------------
     Handle tab change → update query
  ---------------------------------- */
  const handleTabChange = (tabKey: string) => {
    onChange(tabKey);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabKey);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <DynamicTabs
      tabs={tabs.map((t) => ({ key: t.key, label: t.label }))}
      defaultTab={active}
      onChange={handleTabChange}
      variant="scroll"
    />
  );
}

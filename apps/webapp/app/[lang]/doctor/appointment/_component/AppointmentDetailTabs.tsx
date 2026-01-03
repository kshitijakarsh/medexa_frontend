// // "use client";

// // import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// // import { appointmentTabsConfig } from "./appointmentTabsConfig";

// // export function AppointmentDetailTabs({
// //   active,
// //   onChange,
// //   injectedProps,
// // }: {
// //   active: string;
// //   onChange: (tab: string) => void;
// //   injectedProps: any;
// // }) {

// //   const tabs = appointmentTabsConfig(injectedProps);

// //   return (
// //     <DynamicTabs
// //       tabs={tabs.map((t) => ({ key: t.key, label: t.label }))}
// //       defaultTab={active}
// //       onChange={onChange}
// //       variant="scroll"
// //     />
// //   );
// // }



// "use client";

// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
// import { appointmentTabsConfig } from "./appointmentTabsConfig";
// import { useEffect } from "react";

// export function AppointmentDetailTabs({
//   active,
//   onChange,
//   injectedProps,
// }: {
//   active: string;
//   onChange: (tab: string) => void;
//   injectedProps: any;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const tabs = appointmentTabsConfig(injectedProps);

//   /* ----------------------------------
//      Hydrate tab from query on load
//   ---------------------------------- */
//   useEffect(() => {
//     const tabFromQuery = searchParams.get("tab");
//     if (tabFromQuery && tabFromQuery !== active) {
//       onChange(tabFromQuery);
//     }
//   }, [searchParams, active, onChange]);

//   console.log(active)

//   /* ----------------------------------
//      Handle tab change → update query
//   ---------------------------------- */
//   const handleTabChange = (tabKey: string) => {
//     onChange(tabKey);

//     const params = new URLSearchParams(searchParams.toString());
//     params.set("tab", tabKey);

//     router.replace(`${pathname}?${params.toString()}`, {
//       scroll: false,
//     });
//   };

//   return (
//     <DynamicTabs
//       tabs={tabs.map((t) => ({ key: t.key, label: t.label }))}
//       defaultTab={active}
//       onChange={handleTabChange}
//       variant="scroll"
//     />
//   );
// }



"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DynamicTabs } from "@/components/common/dynamic-tabs-props";
import { appointmentTabsConfig } from "./appointmentTabsConfig";
import { useEffect, useMemo, useState } from "react";
import { canWorkOnVisit } from "./common/visitGuards";
import { useUserStore } from "@/store/useUserStore";

import { useDictionary } from "@/i18n/dictionary-context";

export function AppointmentDetailTabs({
  active,
  onChange,
  injectedProps,
  visitStatus,
  onStartConsultation,

}: {
  active: string;
  onChange: (tab: string) => void;
  injectedProps: any;
  visitStatus: string;
  onStartConsultation?: () => void;

}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userPermissions = useUserStore((s) => s.user?.role.permissions);
  const dict = useDictionary();

  const tabs = appointmentTabsConfig(injectedProps, userPermissions);

  // ✅ Resolve initial tab ONCE
  const resolvedInitialTab = useMemo(() => {
    return searchParams.get("tab") ?? active;
  }, []); // ← run only once on mount

  // ✅ Hydrate parent state once
  useEffect(() => {
    if (resolvedInitialTab !== active) {
      onChange(resolvedInitialTab);
    }
  }, [resolvedInitialTab]);

  /* ----------------------------------
     Handle tab change → update query
  ---------------------------------- */
  const handleTabChange = (tabKey: string) => {
    // 🚫 BLOCK if consultation not started
    // if (!canWorkOnVisit(visitStatus)) {
    //   const confirmStart = window.confirm(
    //     "Consultation has not started.\n\nDo you want to start consultation now?"
    //   );

    //   if (confirmStart) {
    //     onStartConsultation?.();
    //   }
    //   return;
    //   }
    onChange(tabKey);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabKey);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <DynamicTabs
      key={resolvedInitialTab}          // 🔥 FORCE remount
      tabs={tabs.map((t) => ({
        key: t.key,
        label: (dict.pages.doctor.appointment.tabs as any)[t.key] || t.label
      }))}
      defaultTab={resolvedInitialTab}   // ✅ correct initial tab
      onChange={handleTabChange}
      variant="scroll"
    />
  );
}

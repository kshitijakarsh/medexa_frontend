"use client";

import React from "react";
import { AlertCircle, Zap, ShieldCheck, Clock, Users, FlaskConical } from "lucide-react";
import PatientCard from "./UI/PatientCard";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { ROUTES } from "@/lib/routes";
import { Surgery } from "@/lib/api/surgery/surgeries";
import { useDictionary } from "@/i18n/use-dictionary";
import { useSurgeries } from "../../_hooks/useSurgery";

const RightSidebar: React.FC = () => {
  const router = useRouter();
  const { lang } = useParams();
  const dict = useDictionary();
  const rightSidebarDict = dict.pages.surgery.dashboard;

  const alerts = [
    {
      id: 1,
      icon: <AlertCircle className="text-red-500" size={20} />,
      title: "OT-3 overrun by 45 mins",
      sub: "Yousef Al-Ghanim in OT-2",
    },
    {
      id: 2,
      icon: <Users className="text-orange-500" size={20} />,
      title: "OT-5 equipment not sterilized",
      sub: "Yousef Al-Ghanim in ER-2",
    },
    {
      id: 3,
      icon: <FlaskConical className="text-blue-500" size={20} />,
      title: "Anesthesia clearance pending",
      sub: "Patient Manam Khan (MRN-2S03)",
    },
  ];

  const SidebarSection = ({
    title,
    icon: Icon,
    onViewAll,
    children,
  }: {
    title: string;
    icon: React.ElementType;
    onViewAll: () => void;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-3xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-blue-500" />
          <h3 className="text-sm font-medium text-gray-700">
            {title}
          </h3>
        </div>
        <Button
          variant="link"
          className="text-xs font-medium text-blue-500 h-auto p-0"
          onClick={onViewAll}
        >
          {rightSidebarDict.viewAll}
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );

  const { data: surgeriesResponse, isLoading } = useSurgeries({ limit: 50 });

  const allSurgeries: Surgery[] = Array.isArray(surgeriesResponse?.data)
    ? surgeriesResponse.data
    : (Array.isArray(surgeriesResponse) ? surgeriesResponse : []);

  const upcomingSurgeries = allSurgeries
    .filter(s => {
      const status = s.status?.toLowerCase();
      return !status || status === "scheduled";
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.scheduled_date || 0).getTime();
      const dateB = new Date(b.date || b.scheduled_date || 0).getTime();
      return dateA - dateB;
    })
    .slice(0, 5);

  const surgeryRequests = allSurgeries.slice(0, 5);


  return (
    <aside className="flex w-full flex-col gap-3">
      {/* Critical Alerts */}
      <div className="bg-white rounded-3xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={18} className="text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">
            {rightSidebarDict.alerts.title}
          </h3>
        </div>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex gap-3">
              <div className="shrink-0">{alert.icon}</div>
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {alert.title}
                </h4>
                <p className="text-xs text-gray-500 truncate">{alert.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Surgeries */}
      <SidebarSection
        title={rightSidebarDict.alerts.upcomingSurgeries}
        icon={Clock}
        onViewAll={() => router.push(`/${lang}${ROUTES.SURGERY_OT_SCHEDULE}`)}
      >
        {isLoading ? (
          <div className="py-4 text-center text-xs text-gray-500">{rightSidebarDict.alerts.loading}</div>
        ) : upcomingSurgeries.length === 0 ? (
          <div className="py-4 text-center text-xs text-gray-500">{rightSidebarDict.alerts.noUpcoming}</div>
        ) : upcomingSurgeries.map((item) => (
          <PatientCard
            key={item.id}
            id={item.id}
            avatar={(item.patient as any)?.photo_url || "/images/avatars/1.png"}
            name={item.patient ? `${item.patient.first_name} ${item.patient.last_name}` : "Unknown"}
            mrn={item.patient?.civil_id || (item as any).patient?.mrn || "—"}
            procedure={item.procedure?.name || item.surgery_type || "—"}
            time={(item.date || item.scheduled_date) ? new Date(item.date || (item.scheduled_date as string)).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            }) : "—"}
            room={(item as any).ot_room_id ? `OT-${(item as any).ot_room_id}` : ((item as any).ot_room || "—")}
            status={item.status}
          />
        ))}
      </SidebarSection>

      {/* Surgery Requests */}
      <SidebarSection
        title={rightSidebarDict.alerts.surgeryRequests}
        icon={Clock}
        onViewAll={() => router.push(`/${lang}${ROUTES.SURGERY_OT_SCHEDULE}`)}
      >
        {isLoading ? (
          <div className="py-4 text-center text-xs text-gray-500">{rightSidebarDict.alerts.loading}</div>
        ) : surgeryRequests.length === 0 ? (
          <div className="py-4 text-center text-xs text-gray-500">{rightSidebarDict.alerts.noRequests}</div>
        ) : surgeryRequests.map((item) => (
          <PatientCard
            key={item.id}
            id={item.id}
            avatar={(item.patient as any)?.photo_url || "/images/avatars/1.png"}
            name={item.patient ? `${item.patient.first_name} ${item.patient.last_name}` : "Unknown"}
            mrn={item.patient?.civil_id || (item as any).patient?.mrn || "—"}
            procedure={item.procedure?.name || item.surgery_type || "—"}
            time={(item.date || item.scheduled_date) ? new Date(item.date || (item.scheduled_date as string)).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            }) : "—"}
            room={(item as any).ot_room_id ? `OT-${(item as any).ot_room_id}` : ((item as any).ot_room || "—")}
            status={item.status}
          />
        ))}
      </SidebarSection>
    </aside>
  );
};

export default RightSidebar;

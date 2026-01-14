"use client";

import React from "react";
import { AlertCircle, Clock, Users, FlaskConical } from "lucide-react";
import PatientCard from "./UI/PatientCard";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { ROUTES } from "@/lib/routes";
import { Surgery } from "@/lib/api/surgery/surgeries";
import { useDictionary } from "@/i18n/use-dictionary";
import { useSurgeries } from "../../_hooks/useSurgery";

interface SurgeryAPIResponse {
  success: boolean;
  data: Surgery[];
}

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
          {dict.dashboard.viewAll}
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );

  const { data: surgeriesResponse, isLoading } = useSurgeries({ limit: 50 });
  const commonDict = dict.pages.surgery.common;

  const allSurgeries: Surgery[] = Array.isArray(surgeriesResponse?.data)
    ? (surgeriesResponse as unknown as SurgeryAPIResponse).data
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

  const renderSurgeryList = (list: Surgery[], noDataLabel: string) => {
    if (isLoading) {
      return <div className="py-4 text-center text-xs text-gray-500">{dict.common.loading}</div>;
    }
    if (list.length === 0) {
      return <div className="py-4 text-center text-xs text-gray-500">{noDataLabel}</div>;
    }
    return list.map((item) => (
      <PatientCard
        key={item.id}
        id={item.id}
        avatar={item.patient?.photo_url || item.patient?.avatarUrl || ""}
        name={item.patient ? `${item.patient.first_name} ${item.patient.last_name}` : commonDict.fallbacks.unknownPatient}
        mrn={item.patient?.civil_id || item.patient?.mrn || "—"}
        procedure={item.procedure?.name || "—"}
        time={(item.date || item.scheduled_date) ? new Date(item.date || (item.scheduled_date as string)).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        }) : "—"}
        room={item.ot_room_id ? `${commonDict.prefixes.otRoom}${item.ot_room_id}` : (item.ot_room || "—")}
        status={item.status}
      />
    ));
  };


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
        {renderSurgeryList(upcomingSurgeries, rightSidebarDict.alerts.noUpcoming)}
      </SidebarSection>

      {/* Surgery Requests */}
      <SidebarSection
        title={rightSidebarDict.alerts.surgeryRequests}
        icon={Clock}
        onViewAll={() => router.push(`/${lang}${ROUTES.SURGERY_OT_SCHEDULE}`)}
      >
        {renderSurgeryList(surgeryRequests, rightSidebarDict.alerts.noRequests)}
      </SidebarSection>
    </aside>
  );
};

export default RightSidebar;

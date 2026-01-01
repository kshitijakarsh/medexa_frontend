"use client";

import React from "react";
import { AlertCircle, Zap, ShieldCheck, Clock } from "lucide-react";
import { EMERGENCY_SURGERIES } from "../../lib/constants";
import PatientCard from "./UI/PatientCard";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";

const RightSidebar: React.FC = () => {
  const router = useRouter();

  const alerts = [
    {
      id: 1,
      icon: <AlertCircle className="text-red-500" size={20} />,
      title: "OT-3 overrun by 45 mins",
      sub: "Yousef Al-Ghanim in OT-2",
    },
    {
      id: 2,
      icon: <Zap className="text-orange-500" size={20} />,
      title: "OT-5 equipment not sterilized",
      sub: "Yousef Al-Ghanim in ER-2",
    },
    {
      id: 3,
      icon: <ShieldCheck className="text-blue-500" size={20} />,
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
    <Card className="shadow-soft bg-background border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-2">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-blue-500" />
          <CardTitle className="text-sm text-gray-700 font-normal">
            {title}
          </CardTitle>
        </div>
        <Button
          variant="link"
          className="text-xs font-medium text-blue-500 h-auto p-0"
          onClick={onViewAll}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-2 pt-0 flex flex-col items-center gap-3">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <aside className="flex w-full flex-col gap-3 lg:w-96">
      {/* Critical Alerts */}
      <Card className="shadow-soft bg-background border-none">
        <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-3 pt-3 pb-4">
          <AlertCircle size={18} className="text-gray-500" />
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-700">
            OT Critical Alerts & Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex gap-2 p-1">
              <div className="h-fit rounded-xl p-2">{alert.icon}</div>
              <div>
                <h4 className="text-[13px] font-medium text-gray-900">
                  {alert.title}
                </h4>
                <p className="text-xs font-normal text-gray-700">{alert.sub}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Surgeries */}
      <SidebarSection
        title="Upcoming Surgeries"
        icon={Clock}
        onViewAll={() => router.push(`/surgery/dashboard/surgery-list`)}
      >
        {EMERGENCY_SURGERIES.map((item, index) => (
          <PatientCard
            key={index}
            avatar={item.avatar}
            name={item.name}
            mrn={item.mrn}
            procedure={item.procedure}
            time={item.time}
            room={item.room}
            status="Emergency"
          />
        ))}
      </SidebarSection>

      {/* Surgery Requests */}
      <SidebarSection
        title="Surgery Requests"
        icon={Clock}
        onViewAll={() => router.push(`/dashboard/surgery-list`)}
      >
        {EMERGENCY_SURGERIES.map((item, index) => (
          <PatientCard
            key={index}
            avatar={item.avatar}
            name={item.name}
            mrn={item.mrn}
            procedure={item.procedure}
            time={item.time}
            room={item.room}
            status="Scheduled"
          />
        ))}
      </SidebarSection>
    </aside>
  );
};

export default RightSidebar;

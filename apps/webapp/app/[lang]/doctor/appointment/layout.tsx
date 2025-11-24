"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppointmentItem } from "./_component/types/appointment";
import { getAppointments } from "./_component/api";
import { AppointmentSidebarSkeleton } from "./_component/AppointmentSidebarSkeleton";
import { AppointmentSidebar } from "./_component/AppointmentSidebar";
import { PageHeader } from "@/components/common/page-header";

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const params = useParams();
    const currentId = params.id as string | undefined;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AppointmentItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        getAppointments().then((d: any) => {
            setData(d);

            if (!currentId && d.length) {
                router.replace(`/doctor-dashboard/consultation/${d[0].id}`);
            } else {
                setActiveId(currentId || d[0]?.id);
            }

            setLoading(false);
        });
    }, [currentId]);

    if (loading) {
        return (
            <div className="flex gap-6">
                <AppointmentSidebarSkeleton />
                <div className="flex-1">{children}</div>
            </div>
        );
    }

    const emergency = data.filter((d) => d.type === "emergency");
    const vip = data.filter((d) => d.type === "vip");
    const general = data.filter((d) => d.type === "general");

    return (
        <div className="p-1">
            <PageHeader title={"Today Appointments"} onBackButton={false} classNameTitle="text-[1rem] font-bold " />
            <div className="flex gap-6 w-full py-3">
                {/* Sidebar */}
                <div className="w-[300px] min-w-[300px]">
                    <AppointmentSidebar
                        emergency={emergency}
                        vip={vip}
                        general={general}
                        activeId={activeId || undefined}
                        onSelect={(item) => {
                            setActiveId(item.id);
                            router.push(`/doctor-dashboard/consultation/${item.id}`);
                        }}
                    />
                </div>

                {/* Right Content */}
                <div className="flex-1 pr-4">{children}</div>
            </div>
        </div>
    );
}

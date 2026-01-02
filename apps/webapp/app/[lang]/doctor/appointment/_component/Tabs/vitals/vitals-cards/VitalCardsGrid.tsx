"use client";

import { VitalCard } from "./VitalCard";
import {
    HeartPulse,
    Activity,
    Thermometer,
    Scale,
    Ruler,
    Gauge,
    Droplets,
    Wind,
    TestTube,
    Info,
    Trash2,
    Pencil,
} from "lucide-react";
import { VitalCardsGridSkeleton } from "./VitalCardsGridSkeleton";
import { Vital } from "./vitals";
import { useDictionary } from "@/i18n/dictionary-context";

export function VitalCardsGrid({
    vitals,
    loading,
    onDelete,
    onEdit,
    canEdit = false,
    canDelete = false,
}: {
    vitals: Vital[];
    loading: boolean;
    onDelete: (id: number) => void;
    onEdit: (vital: Vital) => void;
    canEdit?: boolean;
    canDelete?: boolean;
}) {
    const dict = useDictionary();
    const { fields, grid } = dict.pages.doctor.appointment.tabsContent.vitals;

    if (loading) return <VitalCardsGridSkeleton />;

    if (!Array.isArray(vitals) || vitals.length === 0) {
        return <p className="italic text-gray-500">{dict.pages.doctor.appointment.tabsContent.vitals.history.empty}</p>;
    }

    return (
        <>
            <div>
                {/* HEADER */}
                <div className="text-sm font-semibold text-gray-800">
                    {grid.title}
                </div>
                {vitals.map((vitals) => (
                    <div key={vitals.id} className="border-b pb-4">
                        <div className="flex items-center justify-end my-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white">
                                    <span>
                                        {dict.pages.doctor.appointment.tabsContent.vitals.history.recordedBy}{" "}
                                        <span className="font-medium">
                                            {vitals?.createdBy?.name ?? "Nurse"}
                                        </span>{" "}
                                        {grid.on}{" "}
                                        {vitals?.created_at
                                            ? new Date(vitals.created_at).toLocaleString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                            })
                                            : "--"}
                                    </span>

                                    <Info className="h-3.5 w-3.5 text-blue-500" />
                                </div>

                                {canEdit && (
                                    <button
                                        onClick={() => onEdit(vitals)}
                                        className="rounded-full p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition"
                                        title="Edit Vitals"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                )}

                                {canDelete && (
                                    <button
                                        onClick={() => onDelete(vitals.id)}
                                        className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                                        title="Delete Vitals"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* GRID — UNCHANGED */}
                        <div className="grid grid-cols-4 gap-4">
                            <VitalCard
                                label={fields.bp}
                                value={vitals.blood_pressure}
                                icon={<HeartPulse className="h-5 w-5" />}
                                iconBg="bg-red-100"
                                iconColor="text-red-500"
                            />

                            <VitalCard
                                label={fields.pulse}
                                value={vitals.pulse_rate}
                                icon={<Activity className="h-5 w-5" />}
                                iconBg="bg-blue-100"
                                iconColor="text-blue-600"
                            />

                            <VitalCard
                                label={fields.respiration}
                                value={vitals.respiration_rate}
                                icon={<Wind className="h-5 w-5" />}
                                iconBg="bg-sky-100"
                                iconColor="text-sky-600"
                            />

                            <VitalCard
                                label={fields.spo2}
                                value={vitals.spo2}
                                icon={<Droplets className="h-5 w-5" />}
                                iconBg="bg-yellow-100"
                                iconColor="text-yellow-600"
                            />

                            <VitalCard label={fields.systolicL} value={vitals.systolic_left} icon={<HeartPulse />} iconBg="bg-red-50" iconColor="text-red-500" />
                            <VitalCard label={fields.diastolicL} value={vitals.diastolic_left} icon={<HeartPulse />} iconBg="bg-orange-50" iconColor="text-orange-500" />
                            <VitalCard label={fields.systolicR} value={vitals.systolic_right} icon={<HeartPulse />} iconBg="bg-green-50" iconColor="text-green-600" />
                            <VitalCard label={fields.diastolicR} value={vitals.diastolic_right} icon={<HeartPulse />} iconBg="bg-pink-50" iconColor="text-pink-500" />

                            <VitalCard label={fields.temp} value={vitals.temperature} icon={<Thermometer />} iconBg="bg-orange-100" iconColor="text-orange-600" />
                            <VitalCard label={fields.grbs} value={vitals.grbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />
                            <VitalCard label={fields.hb} value={vitals.hb} icon={<TestTube />} iconBg="bg-rose-50" iconColor="text-rose-500" />
                            <VitalCard label={fields.height} value={vitals.height} icon={<Ruler />} iconBg="bg-purple-50" iconColor="text-purple-600" />

                            <VitalCard label={fields.weight} value={vitals.weight} icon={<Scale />} iconBg="bg-green-50" iconColor="text-green-600" />
                            <VitalCard label={fields.bmi} value={vitals.bmi} icon={<Gauge />} iconBg="bg-pink-100" iconColor="text-pink-600" />
                            <VitalCard label={fields.ibw} value={vitals.ibw} icon={<Gauge />} iconBg="bg-sky-50" iconColor="text-sky-600" />
                            <VitalCard label={fields.rbs} value={vitals.rbs} icon={<TestTube />} iconBg="bg-blue-50" iconColor="text-blue-600" />
                        </div>

                        {/* ADDITIONAL NOTE */}
                        <div className="mt-6">
                            <div className="mb-2 text-sm font-medium text-gray-700">
                                {fields.note}
                            </div>
                            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-gray-700">
                                {vitals.additional_note || "----"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}


import React from 'react';
import { OVERVIEW_STATS } from './mock-data';
import { AlertCircle, PlusSquare } from 'lucide-react';

export function OverviewStats() {
    const { todaysOverview, medications, workload, alerts } = OVERVIEW_STATS;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
            {/* Today's Overview */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-6">Today's Overview</h3>
                <div className="space-y-3">
                    <div className="flex justifies-between items-center w-full">
                        <span className="text-sm text-gray-600 flex-1">Total Patients</span>
                        <span className="text-sm font-semibold text-gray-900">{todaysOverview.totalPatients}</span>
                    </div>
                    <div className="flex justifies-between items-center w-full">
                        <span className="text-sm text-gray-600 flex-1">New Patients</span>
                        <span className="text-sm font-semibold text-green-500">{todaysOverview.newPatients}</span>
                    </div>
                </div>
            </div>

            {/* Medications */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-6">Medications</h3>
                <div className="space-y-3">
                    <div className="flex justifies-between items-center">
                        <span className="text-sm text-gray-600 flex-1">Medications Due</span>
                        <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-xs font-medium">{medications.due}</span>
                    </div>
                    <div className="flex justifies-between items-center">
                        <span className="text-sm text-gray-600 flex-1">Follow-ups</span>
                        <span className="px-2 py-0.5 rounded bg-purple-500 text-white text-xs font-medium">{medications.followUps}</span>
                    </div>
                </div>
            </div>

            {/* Workload Stats */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-6">Workload Stats</h3>
                <div className="space-y-3">
                    <div className="flex justifies-between items-center w-full">
                        <span className="text-sm text-gray-600 flex-1">Pending Tasks</span>
                        <span className="px-1.5 py-0.5 rounded border border-gray-300 text-gray-600 text-xs font-medium">{workload.pendingTasks}</span>
                    </div>
                    <div className="flex justifies-between items-center w-full">
                        <span className="text-sm text-gray-600 flex-1">Prescriptions Issued</span>
                        <span className="px-1.5 py-0.5 rounded border border-gray-300 text-gray-600 text-xs font-medium">{workload.prescriptionsIssued}</span>
                    </div>
                </div>
            </div>

            {/* Alerts */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <h3 className="text-sm font-bold text-gray-900">Alerts</h3>
                </div>
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="flex gap-3">
                            <div className="mt-0.5">
                                {alert.type === 'critical' ? (
                                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">!</span>
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                                        <PlusSquare className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 leading-tight">{alert.title}</h4>
                                <p className="text-[10px] text-gray-500 leading-tight">{alert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

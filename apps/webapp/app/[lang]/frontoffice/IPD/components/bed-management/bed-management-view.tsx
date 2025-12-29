
import React from "react";
import { OverviewStats } from "./overview-stats";
import { StatusLegend } from "./status-legend";
import { WardGrid } from "./ward-grid";

export function BedManagementView() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Bed & Ward Allocation</h1>
                <p className="text-gray-500 text-sm">Manage admissions, transfers, and bed occupancy</p>
            </div>

            <OverviewStats />

            <StatusLegend />

            <WardGrid />
        </div>
    );
}

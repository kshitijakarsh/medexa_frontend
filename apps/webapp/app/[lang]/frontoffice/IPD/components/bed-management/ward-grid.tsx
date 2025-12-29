
import React from "react";
import { ICU_WARD_BEDS } from "./mock-data";
import { BedCard } from "./bed-card";

export function WardGrid() {
    const occupiedCount = ICU_WARD_BEDS.filter((bed) => bed.status === "Occupied").length;
    const totalBeds = ICU_WARD_BEDS.length;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-900">ICU Ward</h2>
                <p className="text-xs text-gray-500">{occupiedCount}/{totalBeds} beds occupied</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ICU_WARD_BEDS.map((bed) => (
                    <BedCard key={bed.id} data={bed} />
                ))}
            </div>
        </div>
    );
}

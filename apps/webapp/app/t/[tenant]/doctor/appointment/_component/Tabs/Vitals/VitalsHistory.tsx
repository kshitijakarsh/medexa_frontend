import React, { useState } from "react";
import { VitalCard } from "./VitalCard";

/**
 * history: array of entries { id, recordedAt, recordedBy, vitals:{ bloodPressure, pulseRate, ... }, observations }
 */
export default function VitalsHistory({ history }: { history: any[] }) {
  const [openId, setOpenId] = useState<string | null>(history?.[0]?.id ?? null);

  return (
    <div className="mt-6 space-y-3">
      {history && history.length ? history.map((entry) => (
        <div key={entry.id} className="border rounded-xl shadow-sm bg-white">
          <button
            onClick={() => setOpenId((s) => (s === entry.id ? null : entry.id))}
            className="w-full text-left p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{new Date(entry.recordedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div className="text-sm text-gray-500">Recorded by {entry.recordedBy} at {new Date(entry.recordedAt).toLocaleTimeString()}</div>
            </div>
            <div>{openId === entry.id ? "▴" : "▾"}</div>
          </button>

          {openId === entry.id && (
            <div className="p-4 border-t">
              <div className="grid grid-cols-3 gap-4">
                <VitalCard label="Blood Pressure" value={entry.vitals.bloodPressure ?? "---"} />
                <VitalCard label="Pulse Rate" value={entry.vitals.pulseRate ?? "---"} />
                <VitalCard label="Temperature" value={entry.vitals.temperature ?? "---"} />
                <VitalCard label="Weight" value={entry.vitals.weight ?? "---"} />
                <VitalCard label="Height" value={entry.vitals.height ?? "---"} />
                <VitalCard label="BMI" value={entry.vitals.bmi ?? "---"} />
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium mb-1">Additional Observations</div>
                <div className="border rounded-xl p-3 text-gray-600">{entry.observations || "-----"}</div>
              </div>
            </div>
          )}
        </div>
      )) : <div className="p-4 text-gray-500">No history yet</div>}
    </div>
  );
}

"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "@workspace/ui/lib/rechart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

const vitalsData = [
  { time: "10pm", bp: 120, pulse: 78, temp: 98.4, oxygen: 98 },
  { time: "11pm", bp: 118, pulse: 76, temp: 98.3, oxygen: 98 },
  { time: "12pm", bp: 115, pulse: 74, temp: 98.2, oxygen: 97 },
  { time: "1pm", bp: 113, pulse: 72, temp: 98.1, oxygen: 97 },
  { time: "2pm", bp: 150, pulse: 90, temp: 98.1, oxygen: 96 },
  { time: "3pm", bp: 110, pulse: 70, temp: 98.0, oxygen: 96 },
  { time: "4pm", bp: 111, pulse: 72, temp: 98.2, oxygen: 97 },
  { time: "5pm", bp: 114, pulse: 75, temp: 98.3, oxygen: 97 },
  { time: "6pm", bp: 118, pulse: 80, temp: 98.5, oxygen: 98 },
  { time: "7pm", bp: 122, pulse: 84, temp: 98.6, oxygen: 98 },
];

const vitalMap = {
  bp: { label: "Blood Pressure", color: "#2563eb", unit: "mmHg" },
  pulse: { label: "Pulse Rate", color: "#0ea5e9", unit: "bpm" },
  temp: { label: "Temperature", color: "#f97316", unit: "°C" },
  oxygen: { label: "SpO₂", color: "#ec4899", unit: "%" },
};

export function VitalGraph() {
  const [vitalKey, setVitalKey] = React.useState<keyof typeof vitalMap>("bp");
  const [range, setRange] = React.useState("24h");

  const cfg = vitalMap[vitalKey];

  return (
    <div className="bg-white rounded-xl p-4 border">
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between mb-4">
        {/* LEFT SELECT */}
        <Select value={vitalKey} onValueChange={(v) => setVitalKey(v as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(vitalMap).map(([key, v]) => (
              <SelectItem key={key} value={key}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* RIGHT SELECT */}
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24 hours</SelectItem>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GRAPH */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={vitalsData}>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-white border rounded-lg px-3 py-2 shadow-sm text-sm">
                    <div className="text-gray-500 mb-1">
                      14 Nov at {label}
                    </div>
                    <div className="font-semibold">
                      {payload[0].value}/{cfg.unit}
                    </div>
                  </div>
                );
              }}
            />

            <defs>
              <linearGradient id="vitalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={cfg.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={cfg.color} stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area
              type="natural"
              dataKey={vitalKey}
              stroke={cfg.color}
              fill="url(#vitalGradient)"
              strokeWidth={2}
              dot={{ r: 4, fill: cfg.color }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

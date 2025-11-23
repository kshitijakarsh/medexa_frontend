// "use client";

// import React from "react";


// import {
//     Tabs,
//     TabsList,
//     TabsTrigger,
//     TabsContent,
// } from "@workspace/ui/components/tabs";

// import { ChartContainer, ChartTooltip } from "@workspace/ui/components/chart";
// import { Line } from "@workspace/ui/lib/rechart";

// // Register chart.js components
// ChartJS.register(
//     LineElement,
//     PointElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend
// );

// interface Props {
//     data: {
//         time: string;
//         bp: number;
//         pulse: number;
//         temperature: number;
//         oxygen: number;
//     }[];
// }

// export function VitalGraph({ data }: Props) {
//     const labels = data.map((d) => d.time);

//     const chartConfig = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: { grid: { display: false } },
//             y: { grid: { color: "#f2f6fb" } },
//         },
//         plugins: {
//             legend: { display: false },
//             tooltip: {
//                 enabled: false,
//                 external: ChartTooltip,
//             },
//         },
//     };

//     return (
//         <div className="bg-white border rounded-xl p-4">
//             <Tabs defaultValue="bp" className="w-full">
//                 {/* TOP BUTTONS */}
//                 <div className="flex items-center justify-between mb-3">
//                     <TabsList className="flex gap-2">
//                         <TabsTrigger
//                             className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 data-[state=active]:bg-blue-200"
//                             value="bp"
//                         >
//                             Blood Pressure
//                         </TabsTrigger>
//                         <TabsTrigger
//                             className="px-3 py-1 rounded-md border text-gray-600 data-[state=active]:bg-gray-200"
//                             value="pulse"
//                         >
//                             Pulse Rate
//                         </TabsTrigger>
//                         <TabsTrigger
//                             className="px-3 py-1 rounded-md border text-gray-600 data-[state=active]:bg-gray-200"
//                             value="temperature"
//                         >
//                             Temperature
//                         </TabsTrigger>
//                         <TabsTrigger
//                             className="px-3 py-1 rounded-md border text-gray-600 data-[state=active]:bg-gray-200"
//                             value="oxygen"
//                         >
//                             Oxygen
//                         </TabsTrigger>
//                     </TabsList>

//                     <select className="border rounded-md px-2 py-1">
//                         <option>24 hours</option>
//                         <option>7 days</option>
//                     </select>
//                 </div>

//                 {/* BP Chart */}
//                 <TabsContent value="bp">
//                     <ChartContainer className="h-[260px] w-full">
//                         <Line
//                             data={{
//                                 labels,
//                                 datasets: [
//                                     {
//                                         label: "Blood Pressure",
//                                         data: data.map((d) => d.bp),
//                                         borderColor: "#2b9af3",
//                                         backgroundColor: "rgba(43,154,243,0.4)",
//                                         borderWidth: 2,
//                                         tension: 0.4,
//                                         pointRadius: 3,
//                                     },
//                                 ],
//                             }}
//                             options={chartConfig}
//                         />
//                     </ChartContainer>
//                 </TabsContent>

//                 {/* Pulse Chart */}
//                 <TabsContent value="pulse">
//                     <ChartContainer className="h-[260px] w-full">
//                         <Line
//                             data={{
//                                 labels,
//                                 datasets: [
//                                     {
//                                         label: "Pulse Rate",
//                                         data: data.map((d) => d.pulse),
//                                         borderColor: "#ff7e55",
//                                         backgroundColor: "rgba(255,126,85,0.4)",
//                                         borderWidth: 2,
//                                         tension: 0.4,
//                                         pointRadius: 3,
//                                     },
//                                 ],
//                             }}
//                             options={chartConfig}
//                         />
//                     </ChartContainer>
//                 </TabsContent>

//                 {/* Temperature Chart */}
//                 <TabsContent value="temperature">
//                     <ChartContainer className="h-[260px] w-full">
//                         <Line
//                             data={{
//                                 labels,
//                                 datasets: [
//                                     {
//                                         label: "Temperature",
//                                         data: data.map((d) => d.temperature),
//                                         borderColor: "#ffb74d",
//                                         backgroundColor: "rgba(255,183,77,0.4)",
//                                         borderWidth: 2,
//                                         tension: 0.4,
//                                         pointRadius: 3,
//                                     },
//                                 ],
//                             }}
//                             options={chartConfig}
//                         />
//                     </ChartContainer>
//                 </TabsContent>

//                 {/* Oxygen Chart */}
//                 <TabsContent value="oxygen">
//                     <ChartContainer className="h-[260px] w-full">
//                         <Line
//                             data={{
//                                 labels,
//                                 datasets: [
//                                     {
//                                         label: "Oxygen",
//                                         data: data.map((d) => d.oxygen),
//                                         borderColor: "#4caf50",
//                                         backgroundColor: "rgba(76,175,80,0.4)",
//                                         borderWidth: 2,
//                                         tension: 0.4,
//                                         pointRadius: 3,
//                                     },
//                                 ],
//                             }}
//                             options={chartConfig}
//                         />
//                     </ChartContainer>
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }


"use client";

import React from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs";

import { ChartContainer, ChartTooltip } from "@workspace/ui/components/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "@workspace/ui/lib/rechart";

interface Props {
  data: {
    time: string;
    bp: number;
    pulse: number;
    temperature: number;
    oxygen: number;
  }[];
}

export function VitalGraph({ data }: Props) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <Tabs defaultValue="bp" className="w-full">
        {/* HEADER BUTTONS */}
        <div className="flex items-center justify-between mb-3">
          <TabsList className="flex gap-2">
            <TabsTrigger
              value="bp"
              className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 data-[state=active]:bg-blue-200"
            >
              Blood Pressure
            </TabsTrigger>
            <TabsTrigger
              value="pulse"
              className="px-3 py-1 rounded-md border text-gray-600 data-[state=active]:bg-gray-200"
            >
              Pulse Rate
            </TabsTrigger>
            <TabsTrigger
              value="temperature"
              className="px-3 py-1 rounded-md border text-gray-600 data-[state=active]:bg-gray-200"
            >
              Temperature
            </TabsTrigger>
            <TabsTrigger
              value="oxygen"
              className="px-3 py-1 rounded-md border text-gray-600 data-[state=active]:bg-gray-200"
            >
              Oxygen
            </TabsTrigger>
          </TabsList>

          <select className="border rounded-md px-2 py-1">
            <option>24 hours</option>
            <option>7 days</option>
          </select>
        </div>

        {/* BP CHART */}
        <TabsContent value="bp">
          <ChartContainer className="h-[260px] w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid vertical={false} stroke="#f2f6fb" />
                <XAxis dataKey="time" />
                <YAxis />
                <RechartTooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="bp"
                  stroke="#2b9af3"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        {/* PULSE CHART */}
        <TabsContent value="pulse">
          <ChartContainer className="h-[260px] w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid vertical={false} stroke="#f2f6fb" />
                <XAxis dataKey="time" />
                <YAxis />
                <RechartTooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="pulse"
                  stroke="#ff7e55"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        {/* TEMPERATURE CHART */}
        <TabsContent value="temperature">
          <ChartContainer className="h-[260px] w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid vertical={false} stroke="#f2f6fb" />
                <XAxis dataKey="time" />
                <YAxis />
                <RechartTooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ffb74d"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        {/* OXYGEN CHART */}
        <TabsContent value="oxygen">
          <ChartContainer className="h-[260px] w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid vertical={false} stroke="#f2f6fb" />
                <XAxis dataKey="time" />
                <YAxis />
                <RechartTooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="oxygen"
                  stroke="#4caf50"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}

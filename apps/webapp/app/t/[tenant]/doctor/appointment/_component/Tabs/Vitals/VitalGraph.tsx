"use client";

import * as React from "react";

import {
    Area,
    AreaChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "@workspace/ui/lib/rechart";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@workspace/ui/components/tabs";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@workspace/ui/components/chart";

import { cn } from "@workspace/ui/lib/utils";

const vitalsData = [
    { time: "10pm", bp: 120, pulse: 78, temp: 98.4, oxygen: 98 },
    { time: "11pm", bp: 118, pulse: 76, temp: 98.3, oxygen: 98 },
    { time: "12am", bp: 115, pulse: 74, temp: 98.2, oxygen: 97 },
    { time: "1am", bp: 113, pulse: 72, temp: 98.1, oxygen: 97 },
    { time: "2am", bp: 112, pulse: 71, temp: 98.1, oxygen: 96 },
    { time: "3am", bp: 110, pulse: 70, temp: 98.0, oxygen: 96 },
    { time: "4am", bp: 111, pulse: 72, temp: 98.2, oxygen: 97 },
    { time: "5am", bp: 114, pulse: 75, temp: 98.3, oxygen: 97 },
    { time: "6am", bp: 118, pulse: 80, temp: 98.5, oxygen: 98 },
    { time: "7am", bp: 122, pulse: 84, temp: 98.6, oxygen: 98 },
];

const vitalTabs = {
  bp: {
    label: "Blood Pressure",
    key: "bp",
    gradient: "gradBP",
    color: "#ef4444", // red-500
    unit: "mmHg",
  },
  pulse: {
    label: "Pulse Rate",
    key: "pulse",
    gradient: "gradPulse",
    color: "#3b82f6", // blue-500
    unit: "bpm",
  },
  temp: {
    label: "Temperature",
    key: "temp",
    gradient: "gradTemp",
    color: "#f97316", // orange-500
    unit: "°C",
  },
  oxygen: {
    label: "Oxygen",
    key: "oxygen",
    gradient: "gradOxy",
    color: "#ec4899", // pink-500
    unit: "%",
  },
};


export function VitalGraph({ className }: { className?: string }) {
    return (
        <Card className={cn("@container/card", className)}>
            <CardHeader className="px-6">
                <CardTitle>Vital Graph</CardTitle>
                <CardDescription>
                    Blood Pressure, Pulse, Temperature & Oxygen
                </CardDescription>
            </CardHeader>

            <CardContent className="px-6">
                <Tabs defaultValue="bp" className="w-full">
                    <TabsList className="mb-4 grid grid-cols-4 w-full rounded-xl bg-gray-100 p-1">
                        {Object.entries(vitalTabs).map(([key, cfg]) => (
                            <TabsTrigger
                                key={key}
                                value={key}
                                className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                            >
                                {cfg.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* CONTENT */}
                    {Object.entries(vitalTabs).map(([id, cfg]) => (
                        <TabsContent key={id} value={id}>
                            {/* <ChartContainer className="h-72 w-full" config={{}}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={vitalsData}
                                        margin={{ left: 12, right: 12 }}
                                    >
                                        <CartesianGrid vertical={false} stroke="#f1f1f1" />

                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tickMargin={10}
                                        />

                                        <YAxis hide />

                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" />}
                                        />

                                        {/* GRADIENT 
                                        <defs>
                                            <linearGradient id={cfg.gradient} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={cfg.color} stopOpacity={0.4} />
                                                <stop offset="70%" stopColor={cfg.color} stopOpacity={0.1} />
                                                <stop offset="100%" stopColor={cfg.color} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>

                                        {/* LIGHT AREA UNDER LINE 
                                        <Area
                                            type="natural"
                                            dataKey={cfg.key}
                                            fill={`url(#${cfg.gradient})`}
                                            stroke="transparent"
                                            fillOpacity={1}
                                        />

                                        {/* MAIN LINE
                                        <Line
                                            type="natural"
                                            dataKey={cfg.key}
                                            stroke={cfg.color}
                                            strokeWidth={3}
                                          dot={{ r: 4, fill: cfg.color }}
                                          activeDot={{
                                            r: 6,
                                            fill: cfg.color,
                                            stroke: "#fff",
                                            strokeWidth: 2,
                                          }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer> */}
                            <ChartContainer
                                config={{}}
                                className="h-72 w-full"
                            >
                                <AreaChart
                                    data={vitalsData}
                                    accessibilityLayer
                                    margin={{ left: 12, right: 12 }}
                                >
                                    <CartesianGrid vertical={false} />

                                    <XAxis
                                        dataKey="time"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />

                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />

                                    {/* Gradient */}
                                    <defs>
                                        <linearGradient id={cfg.gradient} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={cfg.color} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={cfg.color} stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>

                                    {/* Area line */}
                                    <Area
                                        dataKey={cfg.key}
                                        type="natural"
                                        fill={`url(#${cfg.gradient})`}
                                        stroke={cfg.color}
                                        strokeWidth={2}
                                        fillOpacity={0.4}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}

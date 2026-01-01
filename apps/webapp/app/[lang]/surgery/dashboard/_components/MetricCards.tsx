"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";

interface MetricCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <Card
      className={cn(
        "bg-white pt-5 pb-4 pl-4.5 pr-5 rounded-xl border border-gray-100 h-full shadow-none",
        className
      )}
    >
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-gray-900 font-bold text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-2 h-full justify-between">
        {children}
      </CardContent>
    </Card>
  );
};

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <MetricCard title="Surgeries Today">
        <div className="mt-auto flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Surgeries</span>
            <span>8</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Completed</span>
            <span className="text-green-500">3</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Pending</span>
            <span className="text-orange-400">5</span>
          </div>
        </div>
      </MetricCard>

      <MetricCard title="Patient Types">
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">IPD Patients</span>
            <span className="bg-blue-600 text-white px-3 py-0.5 rounded-md font-bold">
              2
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Emergency</span>
            <span className="bg-purple-600 text-white px-3 py-0.5 rounded-md font-bold">
              6
            </span>
          </div>
        </div>
      </MetricCard>

      <MetricCard title="Surgery Request">
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Pending Request</span>
            <span className="border border-gray-300 px-3 py-0.5 rounded-md font-bold">
              4
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Prescriptions Issued</span>
            <span className="border border-gray-300 px-3 py-0.5 rounded-md font-bold">
              12
            </span>
          </div>
        </div>
      </MetricCard>
    </div>
  );
};

export default StatsCards;

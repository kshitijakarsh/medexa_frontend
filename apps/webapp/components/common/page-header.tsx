"use client";

import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { MoveLeft } from "lucide-react";
import React from "react";

interface PageHeaderProps {
  /** The main title shown next to the back button */
  title: string;
  /** Optional callback for back button; defaults to router.back() */
  onBack?: () => void;
  /** Optional custom back icon */
  icon?: React.ReactNode;
  /** Additional class names */
  className?: string;
  classNameTitle?: string;
  onBackButton?: boolean;
}

export function PageHeader({
  title,
  onBack,
  icon = <MoveLeft className="w-5 h-5" />,
  className = "",
  classNameTitle="",
  onBackButton = true
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {onBackButton &&
        <Button
          variant="ghost"
          className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded-md hover:text-white cursor-pointer"
          onClick={onBack || (() => router.back())}
        >
          {icon}
        </Button>
      }
      <h1 className={`text-xl font-semibold text-gray-800 ${classNameTitle}`}>{title}</h1>
    </div>
  );
}

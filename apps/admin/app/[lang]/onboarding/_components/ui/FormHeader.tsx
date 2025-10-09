// components/onboard-hospital/ui/FormHeader.tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface FormHeaderProps {
  title: string;
  backHref?: string;
}

export const FormHeader = ({ title, backHref = "/" }: FormHeaderProps) => {
  return (
    <div className="flex items-center gap-2 bg-[#D7ECFF] w-full px-4 py-2 rounded-0 shadow-sm">
      {backHref && (
        <Button variant="secondary" asChild className="bg-transparent">
          <Link href={backHref}>
            <ArrowLeft color="#EE7373" className="size-4" />
          </Link>
        </Button>
      )}
      <h2 className="text-xl md:text-2xl font-semibold text-[#001A4D]">
        {title}
      </h2>
    </div>
  );
};

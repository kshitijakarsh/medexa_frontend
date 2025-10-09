// components/onboard-hospital/sections/FormActionsSection.tsx
"use client";

import React from "react";
import { Button } from "@workspace/ui/components/button";
import { SubmitButton } from "../ui/SubmitButton";

interface FormActionsSectionProps {
  serverError?: string | null;
  loading: boolean;
  onReset: () => void;
  isEdit?: boolean | string | number | null;
}

export const FormActionsSection = ({ serverError, loading, onReset, isEdit }: FormActionsSectionProps) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-white/80 rounded-lg p-4 md:p-6 shadow-sm border border-slate-100">
      {serverError && <div className="text-sm text-red-600">{serverError}</div>}

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onReset}
          disabled={loading}
          className="px-4 py-2"
        >
          Reset
        </Button>

        <SubmitButton loading={loading} isEdit={!!isEdit} />
      </div>
    </div>
  );
};

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

export const FormActionsSection = ({
  serverError,
  loading,
  onReset,
  isEdit,
}: FormActionsSectionProps) => {
  return (
    <div className="bg-white/80 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center relative">
      
      {/* Error Message */}
      {serverError && (
        <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* Buttons */}
      <div className="ml-auto flex gap-3 items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={onReset}
          disabled={loading}
          className="px-4 py-2 cursor-pointer"
        >
          Reset
        </Button>

        <SubmitButton loading={loading} isEdit={!!isEdit} />
      </div>
    </div>
  );
};

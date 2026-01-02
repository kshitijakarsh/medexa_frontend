"use client";

import { useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";

import {
  VisitPurposeFormProps,
  VisitPurposeData,
  VisitPurposeErrors,
} from "./VisitPurpose";

import { validateField } from "./visitPurposeValidation";
import { useUserStore } from "@/store/useUserStore";
import { hasPermission, normalizePermissionList, PERMISSIONS } from "@/app/utils/permissions";

export function VisitPurposeForm({ data, setData, setDirty }: VisitPurposeFormProps) {
  const userPermissions = useUserStore((s) => s.user?.role.permissions ?? []);
  const [errors, setErrors] = useState<VisitPurposeErrors>({});
  const permissionKeys = normalizePermissionList(userPermissions)

  const canView = hasPermission(
    permissionKeys,
    PERMISSIONS.DOCTOR.VISIT_PURPOSE.VIEW
  );

  const canEdit =
    hasPermission(permissionKeys, PERMISSIONS.DOCTOR.VISIT_PURPOSE.CREATE) ||
    hasPermission(permissionKeys, PERMISSIONS.DOCTOR.VISIT_PURPOSE.EDIT);

  const isDisabled = !canEdit;

  // ❌ If no view permission, don’t render at all
  if (!canView) {
    return (
      <p className="text-sm text-muted-foreground">
        You do not have permission to view Visit Purpose.
      </p>
    );
  }

  const safeData: VisitPurposeData = {
    chiefComplaint: data?.chiefComplaint ?? "",
    history: data?.history ?? "",
    onset: data?.onset ?? "",
    duration: data?.duration ?? "",
    severity: data?.severity ?? "",
    additional_notes: data?.additional_notes ?? "",
  };

  const handleChange = (field: keyof VisitPurposeData, value: string) => {
    if (isDisabled) return;

    const errorMsg = validateField(field, value);

    setErrors((prev) => ({
      ...prev,
      [field]: errorMsg || undefined,
    }));

    setData((prev) => ({
      ...safeData,
      ...prev,
      [field]: value,
    }));

    setDirty(true);
  };

  const options = ["Minutes", "Hours", "Days", "Weeks", "Months", "Sudden", "Gradual"];

  return (
    <div className="flex flex-col gap-6 opacity-100">

      {/* Chief Complaint */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Chief Complaint</label>
        <Input
          value={safeData.chiefComplaint}
          disabled={isDisabled}
          onChange={(e) => handleChange("chiefComplaint", e.target.value)}
          placeholder="Enter Chief Complaint"
        />
        {errors.chiefComplaint && (
          <span className="text-red-500 text-xs">{errors.chiefComplaint}</span>
        )}
      </div>

      {/* History */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">History of Present Illness</label>
        <Textarea
          value={safeData.history}
          disabled={isDisabled}
          onChange={(e) => handleChange("history", e.target.value)}
          className="min-h-[120px]"
          placeholder="Enter History of Present Illness"
        />
      </div>

      {/* Select fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["onset", "duration", "severity"] as (keyof VisitPurposeData)[]).map((key) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="font-medium text-sm">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>

            <Select
              value={safeData[key]}
              disabled={isDisabled}
              onValueChange={(v) => handleChange(key, v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${key}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Additional Notes</label>
        <Textarea
          value={safeData.additional_notes}
          disabled={isDisabled}
          onChange={(e) => handleChange("additional_notes", e.target.value)}
          placeholder="Enter Additional Notes"
        />
      </div>

      {/* View-only hint */}
      {!canEdit && (
        <p className="text-xs text-muted-foreground italic">
          You have view-only access.
        </p>
      )}
    </div>
  );
}

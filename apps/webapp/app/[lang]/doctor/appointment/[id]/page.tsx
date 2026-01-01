"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AppointmentDetailSkeleton } from "../_component/AppointmentDetailSkeleton";
import { AppointmentDetailHeader } from "../_component/AppointmentDetailHeader";
import { AppointmentDetailTabs } from "../_component/AppointmentDetailTabs";
import { AppointmentDetailContent } from "../_component/AppointmentDetailContent";
import { FloatingSaveBar } from "../_component/FloatingSaveBar";

import { mapVisitToAppointmentItem } from "../_component/common/mapper";
import { useDoctorVisitById } from "../_component/common/useDoctorVisitById";
import { useVisitPurposeByVisitId, useSaveVisitPurpose } from "../_component/Tabs/_hooks/useVisitPurpose";

import { VisitPurposeData } from "../_component/Tabs/visit-purpose/VisitPurpose";
import { useUpdateVisitStatus } from "../_component/common/useUpdateVisitStatus";
import { SoapNoteData } from "../_component/Tabs/soap/SOAPNote";
import { useSaveSoapNote, useSoapNoteByVisitId } from "../_component/Tabs/_hooks/useSoapNotes";
import { canWorkOnVisit } from "../_component/common/visitGuards";
import { hasPermission, normalizePermissionList, PERMISSIONS } from "@/app/utils/permissions";
import { usePermissionGuard } from "@/app/hooks/usePermissionGuard";
import { useUserStore } from "@/store/useUserStore";

export default function ConsultationDetailPage() {
  const queryClient = useQueryClient();
  const userPermissions = useUserStore((s) => s.user?.role.permissions);

  const permissionKeys = normalizePermissionList(userPermissions)
  const canViewVisitPurpose = hasPermission(
    permissionKeys,
    PERMISSIONS.DOCTOR.VISIT_PURPOSE.VIEW
  );

  const canViewSoapNotes = hasPermission(
    permissionKeys,
    PERMISSIONS.DOCTOR.SOAP_NOTES.VIEW
  );


  const { id: visitId } = useParams() as { id: string };
  // console.log(visitId)

  /* ---------------------- GET Visit Details ---------------------- */
  const { data: visitData, isLoading } = useDoctorVisitById(visitId);

  /* ---------------------- Visit Status Mutations ---------------------- */
  const startMutation = useUpdateVisitStatus(visitId);
  const updateStatusMutation = useUpdateVisitStatus(visitId);

  /* ---------------------- Start Consultation ---------------------- */

  const handleStartConsultation = async () => {
    await startMutation.mutateAsync("in_consultation");
  };


  /* ---------------------- GET Visit Purpose ---------------------- */
  // const {
  //   data: visitPurpose,
  //   isLoading: purposeLoading,
  // } = useVisitPurposeByVisitId(visitId);

  const {
    data: visitPurpose,
    isLoading: purposeLoading,
  } = useVisitPurposeByVisitId(visitId, {
    enabled: canViewVisitPurpose,
  });

  /* ---------------------- Local Form State ---------------------- */
  const [visitPurposeData, setVisitPurposeData] = useState<VisitPurposeData>({
    chiefComplaint: "",
    history: "",
    onset: "",
    duration: "",
    severity: "",
    additional_notes: "",
  });

  const [isVisitPurposeDirty, setVisitPurposeDirty] = useState(false);
  const [activeTab, setActiveTab] = useState("Visit purpose");


  /* ---------------------- Hydrate the Form When API Returns ---------------------- */
  useEffect(() => {
    if (visitPurpose) {
      setVisitPurposeData({
        chiefComplaint: visitPurpose.chief_complaint ?? "",
        history: visitPurpose.history_of_present_illness ?? "",
        onset: visitPurpose.onset ?? "",
        duration: visitPurpose.duration ?? "",
        severity: visitPurpose.severity ?? "",
        additional_notes: visitPurpose.additional_notes ?? "",
      });
    }
  }, [visitPurpose]);


  /* ---------------- SOAP NOTE ---------------- */

  const { data: soapNote } = useSoapNoteByVisitId(visitId, {
    enabled: canViewSoapNotes,
  });

  const [soapNoteData, setSoapNoteData] = useState<SoapNoteData>({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const [isSoapNoteDirty, setSoapNoteDirty] = useState(false);

  /* Hydrate */
  useEffect(() => {
    if (soapNote) {
      setSoapNoteData({
        subjective: soapNote?.subjective ?? "",
        objective: soapNote?.objective ?? "",
        assessment: soapNote?.assessment ?? "",
        plan: soapNote?.plan ?? "",
      });
    }
  }, [soapNote]);

  /* Save */
  const saveSoapMutation = useSaveSoapNote(soapNote?.id);





  /* ---------------------- Save (POST / PUT Automatically) ---------------------- */
  const savePurposeMutation = useSaveVisitPurpose(visitPurpose?.id);

  const saveDraftMutation = useMutation({
    mutationFn: async () => {
      //   if (!isVisitPurposeDirty) return;

      //   await savePurposeMutation.mutateAsync({
      //     visit_id: visitId,
      //     patient_id: visitData?.patient_id,
      //     chief_complaint: visitPurposeData.chiefComplaint,
      //     history_of_present_illness: visitPurposeData.history,
      //     onset: visitPurposeData.onset,
      //     duration: visitPurposeData.duration,
      //     severity: visitPurposeData.severity,
      //     additional_notes: visitPurposeData.additional_notes,
      //   });
      // },
      if (isVisitPurposeDirty) {
        await savePurposeMutation.mutateAsync({
          visit_id: visitId,
          patient_id: visitData?.patient_id,
          chief_complaint: visitPurposeData.chiefComplaint,
          history_of_present_illness: visitPurposeData.history,
          onset: visitPurposeData.onset,
          duration: visitPurposeData.duration,
          severity: visitPurposeData.severity,
          additional_notes: visitPurposeData.additional_notes,
        });
        setVisitPurposeDirty(false);
      }
      // console.log("Saving draft...", visitData?.patient_id);
      if (isSoapNoteDirty) {
        await saveSoapMutation.mutateAsync({
          patient_id: visitData?.patient_id,
          visit_id: visitId,
          ...soapNoteData,
        });
        setSoapNoteDirty(false);
      }
    },

    onSuccess: async () => {
      // Reset dirty flags FIRST
      const shouldRefetchVisitPurpose = isVisitPurposeDirty;
      const shouldRefetchSoapNote = isSoapNoteDirty;

      setVisitPurposeDirty(false);
      setSoapNoteDirty(false);

      // 🔥 Refetch ONLY what changed
      if (shouldRefetchVisitPurpose) {
        await queryClient.invalidateQueries({
          queryKey: ["visitPurpose", visitId],
        });
      }

      if (shouldRefetchSoapNote) {
        await queryClient.invalidateQueries({
          queryKey: ["soap-note", visitId],
        });
      }
    },
    // onSuccess: () => { setVisitPurposeDirty(false), setSoapNoteDirty(false) },
  });


  /* ---------------------- Finish Consultation ---------------------- */


  const finishMutation = useMutation({
    mutationFn: async () => {
      // Save draft first if needed
      if (isVisitPurposeDirty) {
        await saveDraftMutation.mutateAsync();
      }

      // Then finish consultation
      await updateStatusMutation.mutateAsync("completed");
    },
  });

  if (isLoading || purposeLoading || !visitData) {
    return <AppointmentDetailSkeleton />;
  }

  const selected = mapVisitToAppointmentItem(visitData);

  const injectedProps = {
    patientId: selected.patient_id,

    // Visit purpose
    visitPurposeData,
    setVisitPurposeData,
    setVisitPurposeDirty,

    // Soap note
    soapNoteData,
    setSoapNoteData,
    setSoapNoteDirty,
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* HEADER */}
      <AppointmentDetailHeader
        item={selected}
        onSaveDraft={() => saveDraftMutation.mutate()}
        onFinish={() => finishMutation.mutate()}
        saving={saveDraftMutation.isPending}
        finishing={finishMutation.isPending}
        starting={startMutation.isPending}
        onStart={handleStartConsultation}
        isLoading={isLoading}
      />
      {canWorkOnVisit(selected.status) ?
        <div className="w-full flex flex-col gap-4">
          {/* TABS */}
          <AppointmentDetailTabs
            active={activeTab}
            onChange={setActiveTab}
            visitStatus={selected.status}
            injectedProps={injectedProps}
            onStartConsultation={handleStartConsultation}
          />

          {/* CONTENT */}
          <AppointmentDetailContent activeTab={activeTab} injectedProps={injectedProps} />

          {/* FLOATING SAVE BUTTON */}
          <FloatingSaveBar
            saving={saveDraftMutation.isPending}
            finishing={finishMutation.isPending}
            onSaveDraft={() => saveDraftMutation.mutate()}
            onFinish={() => finishMutation.mutate()}
          />
        </div>
        :
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-sm text-yellow-800">
          Please start the consultation to access patient details.
        </div>
      }
    </div>
  );
}

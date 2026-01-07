"use client";

import { AppDialog } from "@/components/common/app-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form";
import { AppSelect } from "@/components/common/app-select";
import { AppDatePicker } from "@/components/common/app-date-picker";
import { Input } from "@workspace/ui/components/input";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z, zodResolver } from "@workspace/ui/lib/zod";
import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";
import { useProcedures } from "@/app/[lang]/administration/_hooks/useOperation";
import { useParams } from "next/navigation";
import { useDoctorVisitById } from "@/app/[lang]/doctor/appointment/_component/common/useDoctorVisitById";
import { useCreateSurgery } from "@/app/[lang]/surgery/_hooks/useSurgery";
import { CreateSurgeryParams } from "@/lib/api/surgery/surgeries";
import { useDepartments } from "@/hooks/use-departments";
import { useQuery } from "@tanstack/react-query";
import { createDoctorApiClient } from "@/lib/api/surgery/doctor";
import { createNurseApiClient } from "@/lib/api/nurse-api";
import { getAuthToken } from "@/app/utils/onboarding";

/* ---------- SCHEMA ---------- */
const schema = z.object({
  surgeryType: z.string().min(1, "Surgery type is required"),
  category: z.string().min(1, "Category is required"),
  urgency: z.string().min(1, "Urgency is required"),
  departmentId: z.string().min(1, "Department is required"),
  surgeonId: z.string().min(1, "Surgeon is required"),
  assistantSurgeonId: z.string().optional(),
  anaesthetistId: z.string().optional(),
  scrubNurseId: z.string().optional(),
  circulatingNurseId: z.string().optional(),
  otTechnicianId: z.string().optional(),
  otRoomId: z.string().min(1, "OT Room is required"),
  duration: z.string().min(1, "Duration is required"),
  date: z
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Scheduled date is required",
    }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/* ---------- OPTIONS ---------- */
const SURGERY_TYPES = [
  { value: "knee-replacement", label: "Knee Replacement" },
  { value: "lap-chole", label: "Laparoscopic Cholecystectomy" },
];

const URGENCY_OPTIONS = [
  { value: "elective", label: "Elective" },
  { value: "urgent", label: "Urgent" },
  { value: "emergency", label: "Emergency" },
];

const MOCK_OT_ROOMS = [
  { value: "1", label: "OT Room 1" },
  { value: "2", label: "OT Room 2" },
  { value: "3", label: "OT Room 3" },
];

const MOCK_TECHNICIANS = [
  { value: "1", label: "OT Technician 1" },
  { value: "2", label: "OT Technician 2" },
];

/* ---------- PROPS ---------- */
interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: FormValues) => void;
}

/* ---------- COMPONENT ---------- */
export default function AddSurgeryModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const { id: visitId } = useParams() as { id: string };
  const { data: proceduresData } = useProcedures();
  const { data: visitData } = useDoctorVisitById(visitId);
  const { departments } = useDepartments();
  const createSurgery = useCreateSurgery();

  // API Clients
  const doctorApi = createDoctorApiClient({});

  // Fetch Doctors
  const { data: doctorData, isLoading: isLoadingDoctors } = useQuery({
    queryKey: ["doctors-soap-notes-creators-modal"],
    queryFn: async () => {
      const response = await doctorApi.getAll({ limit: 100 });
      return response.data.data;
    },
    enabled: open,
  });

  // Fetch Nurses
  const { data: nurseData, isLoading: isLoadingNurses } = useQuery({
    queryKey: ["nurses-consumables-creators-modal"],
    queryFn: async () => {
      const token = await getAuthToken();
      const nurseApi = createNurseApiClient({ authToken: token });
      const response = await nurseApi.getConsumablesCreators({ limit: 100 } as any);
      return response.data.data;
    },
    enabled: open,
  });

  const doctorOptions = doctorData?.map(doc => ({
    value: String(doc.id),
    label: doc.name || `${doc.first_name} ${doc.last_name}`
  })) || [];

  const nurseOptions = nurseData?.map(nurse => ({
    value: String(nurse.id),
    label: nurse.name || `${nurse.first_name} ${nurse.last_name}`
  })) || [];

  const apiCategories = proceduresData?.data?.map((item: any) => ({
    value: String(item.id),
    label: item.name,
  })) || [];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      surgeryType: "",
      category: "",
      urgency: "",
      departmentId: "",
      surgeonId: "",
      assistantSurgeonId: "",
      anaesthetistId: "",
      scrubNurseId: "",
      circulatingNurseId: "",
      otTechnicianId: "",
      otRoomId: "",
      duration: "60",
      date: new Date(),
      notes: "",
    },
  });

  const submit = async (values: FormValues) => {
    try {
      if (!visitData?.patient_id) {
        throw new Error("Patient information not found for this visit.");
      }

      // Check if the selected category is a valid procedure ID from the API
      const isApiProcedure = apiCategories.some((cat: any) => cat.value === values.category);

      const payload: CreateSurgeryParams = {
        patient_id: String(visitData.patient_id),
        procedure_id: isApiProcedure ? values.category : "1", // Use "1" as placeholder if mock category selected
        urgency: values.urgency as "elective" | "urgent" | "emergency",
        department_id: values.departmentId === "all-departments" ? visitData.department_id ? String(visitData.department_id) : "1" : values.departmentId,
        date: values.date.toISOString(),
        duration: parseInt(values.duration) || 60,
        ot_room_id: values.otRoomId,
        surgeon_id: values.surgeonId,
        assistant_surgeon_id: values.assistantSurgeonId,
        anaesthetist_id: values.anaesthetistId,
        scrub_nurse_id: values.scrubNurseId,
        circulating_nurse_id: values.circulatingNurseId,
        ot_technician_id: values.otTechnicianId,
      };

      await createSurgery.mutateAsync(payload);
      onClose();
      form.reset();
    } catch (error) {
      console.error("Failed to create surgery:", error);
    }
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Prescribe Surgery"
      maxWidth="md:max-w-3xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
            {/* Surgery Type */}
            <FormField
              name="surgeryType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgery Type</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select Surgery Type"
                      value={field.value}
                      onChange={field.onChange}
                      options={SURGERY_TYPES}
                      error={form.formState.errors.surgeryType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgery Category</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select Surgery Category"
                      value={field.value}
                      onChange={field.onChange}
                      options={apiCategories}
                      error={form.formState.errors.category}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Urgency */}
            <FormField
              name="urgency"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Urgency</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select Urgency"
                      value={field.value}
                      onChange={field.onChange}
                      options={URGENCY_OPTIONS}
                      error={form.formState.errors.urgency}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              name="departmentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select Department"
                      value={field.value}
                      onChange={field.onChange}
                      options={departments}
                      error={form.formState.errors.departmentId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surgeon */}
            <FormField
              name="surgeonId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surgeon</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder={isLoadingDoctors ? "Loading..." : "Select Surgeon"}
                      value={field.value}
                      onChange={field.onChange}
                      options={doctorOptions}
                      error={form.formState.errors.surgeonId}
                      disabled={isLoadingDoctors}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assistant Surgeon */}
            <FormField
              name="assistantSurgeonId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assistant Surgeon</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder={isLoadingDoctors ? "Loading..." : "Select Assistant"}
                      value={field.value}
                      onChange={field.onChange}
                      options={doctorOptions}
                      disabled={isLoadingDoctors}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Anaesthetist */}
            <FormField
              name="anaesthetistId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anaesthetist</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder={isLoadingDoctors ? "Loading..." : "Select Anaesthetist"}
                      value={field.value}
                      onChange={field.onChange}
                      options={doctorOptions}
                      disabled={isLoadingDoctors}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Scrub Nurse */}
            <FormField
              name="scrubNurseId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scrub Nurse</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder={isLoadingNurses ? "Loading..." : "Select Scrub Nurse"}
                      value={field.value}
                      onChange={field.onChange}
                      options={nurseOptions}
                      disabled={isLoadingNurses}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Circulating Nurse */}
            <FormField
              name="circulatingNurseId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Circulating Nurse</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder={isLoadingNurses ? "Loading..." : "Select Circulating Nurse"}
                      value={field.value}
                      onChange={field.onChange}
                      options={nurseOptions}
                      disabled={isLoadingNurses}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* OT Technician */}
            <FormField
              name="otTechnicianId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OT Technician (Optional)</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select OT Technician"
                      value={field.value}
                      onChange={field.onChange}
                      options={MOCK_TECHNICIANS}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* OT Room */}
            <FormField
              name="otRoomId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OT Room</FormLabel>
                  <FormControl>
                    <AppSelect
                      placeholder="Select OT Room"
                      value={field.value}
                      onChange={field.onChange}
                      options={MOCK_OT_ROOMS}
                      error={form.formState.errors.otRoomId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (Minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter duration"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Date</FormLabel>
                  <FormControl>
                    <AppDatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Notes */}
          <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clinical Notes (Optional)</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full border rounded-md p-2 text-sm"
                    rows={2}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <CancelButton onClick={onClose} disabled={createSurgery.isPending} />
            <PrimaryButton
              label={createSurgery.isPending ? "Sending..." : "Send to OT"}
              type="submit"
              disabled={createSurgery.isPending}
            />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

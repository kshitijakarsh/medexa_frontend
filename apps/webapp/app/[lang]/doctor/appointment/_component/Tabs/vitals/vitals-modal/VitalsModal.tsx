"use client";

import { useParams } from "next/navigation";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";

import { AppDialog } from "@/components/common/app-dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@workspace/ui/components/form";

import { useSaveVitals } from "../../_hooks/useVitals";
import { useDictionary } from "@/i18n/dictionary-context";

/* ----------------------------------
   ZOD SCHEMA (matches backend)
---------------------------------- */
const vitalsSchema = z.object({
    blood_pressure: z.string().optional(),
    pulse_rate: z.string().optional(),
    respiration_rate: z.string().optional(),
    spo2: z.string().optional(),

    systolic_left: z.string().optional(),
    diastolic_left: z.string().optional(),
    systolic_right: z.string().optional(),
    diastolic_right: z.string().optional(),

    temperature: z.string().optional(),
    grbs: z.string().optional(),
    hb: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    bmi: z.string().optional(),
    ibw: z.string().optional(),
    rbs: z.string().optional(),

    additional_note: z.string().optional(),
});

type VitalsFormValues = z.infer<typeof vitalsSchema>;

export default function VitalsModal({
    patientId,
    open,
    onClose,
    initial,
}: {
    patientId: string
    open: boolean;
    onClose: () => void;
    initial?: Partial<VitalsFormValues> & { id?: string };
}) {
    const { id: visitId } = useParams() as { id: string };
    const saveVitals = useSaveVitals(initial?.id);
    const dict = useDictionary();

    const form = useForm<VitalsFormValues>({
        resolver: zodResolver(vitalsSchema),
        defaultValues: {
            blood_pressure: initial?.blood_pressure ?? "",
            pulse_rate: initial?.pulse_rate ?? "",
            respiration_rate: initial?.respiration_rate ?? "",
            spo2: initial?.spo2 ?? "",

            systolic_left: initial?.systolic_left ?? "",
            diastolic_left: initial?.diastolic_left ?? "",
            systolic_right: initial?.systolic_right ?? "",
            diastolic_right: initial?.diastolic_right ?? "",

            temperature: initial?.temperature ?? "",
            grbs: initial?.grbs ?? "",
            hb: initial?.hb ?? "",
            height: initial?.height ?? "",
            weight: initial?.weight ?? "",
            bmi: initial?.bmi ?? "",
            ibw: initial?.ibw ?? "",
            rbs: initial?.rbs ?? "",

            additional_note: initial?.additional_note ?? "",
        },
    });

    async function onSubmit(values: VitalsFormValues) {
        await saveVitals.mutateAsync({
            visit_id: visitId,
            patient_id: patientId,
            ...values,
        });
        onClose();
    }

    const { modal, fields, placeholders } = dict.pages.doctor.appointment.tabsContent.vitals;

    return (
        <AppDialog open={open} onClose={onClose} title={modal.title} maxWidth="md:max-w-2xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* GRID */}
                    <div className="grid grid-cols-4 gap-4">

                        {/* Row 1 */}
                        <FormField name="blood_pressure" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.bp}</FormLabel>
                                <FormControl><Input placeholder={placeholders.bp} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name="pulse_rate" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.pulse}</FormLabel>
                                <FormControl><Input placeholder={placeholders.pulse} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="respiration_rate" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.respiration}</FormLabel>
                                <FormControl><Input placeholder={placeholders.respiration} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="spo2" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.spo2}</FormLabel>
                                <FormControl><Input placeholder={placeholders.spo2} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        {/* Row 2 */}
                        <FormField name="systolic_left" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.systolicL}</FormLabel>
                                <FormControl><Input placeholder={placeholders.systolicL} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="diastolic_left" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.diastolicL}</FormLabel>
                                <FormControl><Input placeholder={placeholders.diastolicL} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="systolic_right" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.systolicR}</FormLabel>
                                <FormControl><Input placeholder={placeholders.systolicR} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="diastolic_right" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.diastolicR}</FormLabel>
                                <FormControl><Input placeholder={placeholders.diastolicR} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        {/* Row 3 */}
                        <FormField name="temperature" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.temp}</FormLabel>
                                <FormControl><Input placeholder={placeholders.temp} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="grbs" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.grbs}</FormLabel>
                                <FormControl><Input placeholder={placeholders.grbs} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="hb" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.hb}</FormLabel>
                                <FormControl><Input placeholder={placeholders.hb} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="height" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.height}</FormLabel>
                                <FormControl><Input placeholder={placeholders.height} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        {/* Row 4 */}
                        <FormField name="weight" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.weight}</FormLabel>
                                <FormControl><Input placeholder={placeholders.weight} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="bmi" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.bmi}</FormLabel>
                                <FormControl><Input placeholder={placeholders.bmi} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="ibw" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.ibw}</FormLabel>
                                <FormControl><Input placeholder={placeholders.ibw} {...field} /></FormControl>
                            </FormItem>
                        )} />

                        <FormField name="rbs" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fields.rbs}</FormLabel>
                                <FormControl><Input placeholder={placeholders.rbs} {...field} /></FormControl>
                            </FormItem>
                        )} />

                    </div>

                    {/* NOTES */}
                    <FormField name="additional_note" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>{fields.note}</FormLabel>
                            <FormControl>
                                <textarea
                                    rows={3}
                                    className="w-full rounded-xl border p-3"
                                    placeholder={placeholders.note}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )} />

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button variant="outline" type="button" onClick={onClose}>
                            {modal.cancel}
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={saveVitals.isPending}
                        >
                            {saveVitals.isPending ? modal.saving : modal.save}
                        </Button>
                    </div>

                </form>
            </Form>
        </AppDialog>
    );
}

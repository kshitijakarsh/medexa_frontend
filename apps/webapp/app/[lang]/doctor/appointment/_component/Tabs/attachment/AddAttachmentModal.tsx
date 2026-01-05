// // "use client";

// // import { AppDialog } from "@/components/common/app-dialog";
// // import {
// //   Form,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormControl,
// //   FormMessage,
// // } from "@workspace/ui/components/form";

// // import { Input } from "@workspace/ui/components/input";
// // import { useForm } from "@workspace/ui/hooks/use-form";
// // import { z } from "@workspace/ui/lib/zod";
// // import { zodResolver } from "@workspace/ui/lib/zod";

// // import { PrimaryButton } from "@/components/common/buttons/primary-button";
// // import { CancelButton } from "@/components/common/buttons/cancel-button";
// // import { useSaveAttachment } from "../_hooks/useAttachments";
// // import { Attachment } from "./attachment";

// // const schema = z.object({
// //   title: z.string().min(1, "Title required"),
// //   file: z.instanceof(File, { message: "Attachment required" }),
// // });

// // interface AddAttachmentModalProps {
// //   visitId?: string
// //   open: boolean
// //   onClose: () => void
// //   onSubmit?: () => void
// // }
// // export default function AddAttachmentModal({ visitId, open, onClose, onSubmit }: AddAttachmentModalProps) {
// //   const form = useForm({
// //     resolver: zodResolver(schema),
// //     defaultValues: { title: "", file: undefined },
// //   });

// //   // const submit = (values) => {
// //   //   const fileUrl = URL.createObjectURL(values.file);
// //   //   onSubmit({
// //   //     title: values.title,
// //   //     file: values.file,
// //   //     fileUrl,
// //   //     preview: fileUrl,
// //   //   });

// //   //   onClose();
// //   //   form.reset();
// //   // };
// //   const createAttachment = useSaveAttachment();


// //   const submit = async (values) => {
// //     await createAttachment.mutateAsync({
// //       visit_id: visitId,
// //       patient_id: values.patientId,
// //       title: values.title,
// //       s3_url: values.fileUrl, // backend expects URL
// //     });

// //     onClose();
// //   };


// //   return (
// //     <AppDialog open={open} onClose={onClose} title="Add Attachment">
// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
// //           {/* Title */}
// //           <FormField
// //             control={form.control}
// //             name="title"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Attachment Title</FormLabel>
// //                 <FormControl>
// //                   <Input placeholder="e.g., Lab Report" {...field} />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />

// //           {/* Upload File */}
// //           <FormField
// //             control={form.control}
// //             name="file"
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Upload File</FormLabel>
// //                 <FormControl>
// //                   <Input
// //                     type="file"
// //                     accept="image/*,.pdf"
// //                     onChange={(e) => field.onChange(e.target.files?.[0])}
// //                   />
// //                 </FormControl>
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />

// //           {/* Footer */}
// //           <div className="flex justify-end gap-3 pt-4 border-t">
// //             <CancelButton onClick={onClose} />
// //             <PrimaryButton type="submit" label="Upload" />
// //           </div>
// //         </form>
// //       </Form>
// //     </AppDialog>
// //   );
// // }



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
import { Input } from "@workspace/ui/components/input";
import { useForm } from "@workspace/ui/hooks/use-form";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";

import { PrimaryButton } from "@/components/common/buttons/primary-button";
import { CancelButton } from "@/components/common/buttons/cancel-button";

import { UploadCloud, FileText, X } from "lucide-react";

import { useCreateAttachment } from "../_hooks/useAttachments";
import { useFileUpload } from "@/app/hooks/useFileUpload";

/* ---------- SCHEMA ---------- */
const schema = z.object({
  title: z.string().min(1, "Title required"),
  file: z.instanceof(File, { message: "File is required" }),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  visitId: string;
  patientId: string;
  open: boolean;
  onClose: () => void;
}

import { useDictionary } from "@/i18n/dictionary-context";

export default function AddAttachmentModal({
  visitId,
  patientId,
  open,
  onClose,
}: Props) {
  const finalVisitId = visitId;
  const createAttachment = useCreateAttachment(finalVisitId);
  const { uploadFile, isUploading } = useFileUpload();
  const dict = useDictionary();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  async function submit(values: FormValues) {
    /* 1️⃣ Upload file to S3 */
    const s3PublicUrl = await uploadFile(values.file, "patients");

    /* 2️⃣ Save attachment metadata */
    await createAttachment.mutateAsync({
      visit_id: visitId,
      patient_id: patientId,
      title: values.title,
      s3_url: s3PublicUrl,
    });

    onClose();
    form.reset();
  }


  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={dict.pages.doctor.appointment.tabsContent.attachments.modal.title}
      maxWidth="md:max-w-xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

          {/* TITLE */}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.pages.doctor.appointment.tabsContent.attachments.modal.labelTitle}</FormLabel>
                <FormControl>
                  <Input placeholder={dict.pages.doctor.appointment.tabsContent.attachments.modal.placeholderTitle} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FILE UPLOAD */}
          <FormField
            name="file"
            control={form.control}
            render={({ field }) => {
              const file = field.value;

              return (
                <FormItem>
                  <FormLabel>{dict.pages.doctor.appointment.tabsContent.attachments.modal.labelFile}</FormLabel>
                  <FormControl>
                    {!file ? (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl px-6 py-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                        <UploadCloud className="h-8 w-8 text-blue-500 mb-2" />
                        <p className="text-sm font-medium">
                          {dict.pages.doctor.appointment.tabsContent.attachments.modal.dropText}
                        </p>
                        <p className="text-xs text-gray-500">
                          {dict.pages.doctor.appointment.tabsContent.attachments.modal.fileTypes}
                        </p>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0])
                          }
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between border rounded-xl px-4 py-3 bg-gray-50">
                        <div className="flex gap-3">
                          <FileText className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => field.onChange(undefined)}
                        >
                          <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <CancelButton onClick={onClose} />
            <PrimaryButton
              type="submit"
              label={
                createAttachment.isPending || isUploading
                  ? dict.pages.doctor.appointment.tabsContent.attachments.modal.uploading
                  : dict.pages.doctor.appointment.tabsContent.attachments.modal.upload
              }
            />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

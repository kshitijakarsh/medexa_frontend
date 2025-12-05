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

const schema = z.object({
  title: z.string().min(1, "Title required"),
  file: z.instanceof(File, { message: "Attachment required" }),
});

export default function AddAttachmentModal({ open, onClose, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: "", file: undefined },
  });

  const submit = (values) => {
    const fileUrl = URL.createObjectURL(values.file);
    onSubmit({
      title: values.title,
      file: values.file,
      fileUrl,
      preview: fileUrl,
    });

    onClose();
    form.reset();
  };

  return (
    <AppDialog open={open} onClose={onClose} title="Add Attachment">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attachment Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Lab Report" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload File */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <CancelButton onClick={onClose} />
            <PrimaryButton type="submit" label="Upload" />
          </div>
        </form>
      </Form>
    </AppDialog>
  );
}

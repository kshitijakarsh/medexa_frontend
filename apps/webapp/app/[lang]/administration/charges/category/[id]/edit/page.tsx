"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "@workspace/ui/lib/zod";
import { zodResolver } from "@workspace/ui/lib/zod";
import { useForm } from "@workspace/ui/hooks/use-form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";
import { PageHeader } from "@/components/common/page-header";
import { Header } from "@/components/header";
import { getCategoryById, updateCategory } from "../../../_components/api";
import { StatusSwitch } from "@/components/common/switch-green";

const schema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  active: z.boolean().catch(false),
});

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { PERMISSIONS } from "@/app/utils/permissions";

export default function EditCategoryPage() {
  return (
    <PermissionGuard permission={PERMISSIONS.CHARGE_CATEGORY.EDIT}>
      <EditCategoryPageContent />
    </PermissionGuard>
  )
}

function EditCategoryPageContent() {
  const params = useParams() as { id?: string };
  const id = params?.id ? Number(params.id) : undefined;
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      active: false,
    },
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid category ID");
      setLoading(false);
      return;
    }

    const loadCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        const category = await getCategoryById(id);

        if (!category) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        // Pre-populate form with existing category data
        form.reset({
          name: category.chargeName || "",
          description: category.description || "",
          active: category.status === "Active",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading category:", err);
        setError("Failed to load category data");
        setLoading(false);
      }
    };

    loadCategory();
  }, [id, form]);

  const onSubmit = async (vals: any) => {
    if (!id) {
      setError("Invalid category ID");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        chargeName: vals.name,
        description: vals.description || "",
        status: (vals.active ? "Active" : "Inactive") as "Active" | "Inactive",
      };

      await updateCategory(id, payload);
      setSaving(false);
      router.push("/administration/charges");
    } catch (err: any) {
      console.error("Error updating category:", err);
      setError(err.message || "Failed to update category");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5">
          <PageHeader title="Edit Charges Category" />
          <div className="bg-white p-6 rounded-md shadow-sm mt-2">
            <div className="text-center py-8">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !loading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5">
          <PageHeader title="Edit Charges Category" />
          <div className="bg-white p-6 rounded-md shadow-sm mt-2">
            <div className="text-center py-8 text-red-600">{error}</div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => router.back()} className="text-blue-600 border-blue-500">
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
      <Header />
      <div className="p-5">
        <PageHeader title="Edit Charges Category" />
        <div className="bg-white p-6 rounded-md shadow-sm mt-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Name *</FormLabel>
                    <FormControl><Input placeholder="Enter Charge Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="active" control={form.control} render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col rounded-md px-3">
                      <FormLabel className="pb-2">Status</FormLabel>
                      <div
                        className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"
                          } h-9 px-2`}
                      >
                        <span className="text-sm text-red-500">
                          Inactive
                        </span>
                        <FormControl>
                          <StatusSwitch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <span
                          className={`text-sm ${field.value
                            ? "text-green-600"
                            : "text-gray-400"
                            }`}
                        >
                          Active
                        </span>
                      </div>
                    </div>
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <FormField name="description" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Input placeholder="Enter Description" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="text-blue-600 border-blue-500">
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

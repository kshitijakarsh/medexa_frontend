// /app/charges/service/add/page.tsx
"use client"

import { useEffect, useState } from "react"
import { z } from "@workspace/ui/lib/zod"
import { zodResolver } from "@workspace/ui/lib/zod"
import { useForm } from "@workspace/ui/hooks/use-form"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { PageHeader } from "@/components/common/page-header"
import {
  getCategoriesDropdown,
  getUnitsDropdown,
  getTaxesDropdown,
  addServices,
} from "../_components/api"
import { useRouter } from "next/navigation"
import DynamicSelect from "@/components/common/dynamic-select"
import { StatusSwitch } from "@/components/common/switch-green"

const schema = z.object({
  serviceName: z.string().min(1, "Required"),
  chargeCategory: z.string().min(1, "Required"),
  unit: z.string().min(1, "Required"),
  chargeType: z.string().optional(),
  taxCategory: z.string().optional(),
  taxPercent: z.number().optional(),
  description: z.string().optional(),
  standardCharge: z.number().optional(),
  status: z.boolean().catch(true),
  priceVaryOn: z.boolean().catch(false),
  priceVaryBy: z.string().optional(),
  priceVaryStandard: z.number().optional(),
  priceVaryNormal: z.number().optional(),
  priceVaryVip: z.number().optional(),
})

type StatusType = "Active" | "Inactive"

import { PermissionGuard } from "@/components/auth/PermissionGuard"
import { PERMISSIONS } from "@/app/utils/permissions"

export default function AddServicePage() {
  return (
    <PermissionGuard permission={PERMISSIONS.CHARGE.CREATE}>
      <AddServicePageContent />
    </PermissionGuard>
  )
}

function AddServicePageContent() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceName: "",
      chargeCategory: "",
      unit: "",
      chargeType: "",
      taxCategory: "",
      taxPercent: 0,
      description: "",
      standardCharge: 0,
      status: true,
      priceVaryOn: false,
      priceVaryStandard: 0,
      priceVaryNormal: 0,
      priceVaryVip: 0,
    },
  })
  const [cats, setCats] = useState<any[]>([])
  const [units, setUnits] = useState<any[]>([])
  const [taxes, setTaxes] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCategoriesDropdown().then((r) => setCats(r))
    getUnitsDropdown().then((r) => setUnits(r))
    getTaxesDropdown().then((r) => setTaxes(r))
  }, [])

  const onSubmit = async (vals: any) => {
    setSaving(true)
    try {
      const payload = {
        serviceName: vals.serviceName,
        chargeType: vals.chargeType,
        chargeCategory: vals.chargeCategory,
        unit: vals.unit,
        tax: vals.taxCategory,
        standardCharge: Number(vals.standardCharge || 0),
        description: vals.description,
        status: (vals.status ? "Active" : "Inactive") as StatusType,
        priceVaryOn: vals.priceVaryOn,
        priceVaryOptions: vals.priceVaryOn
          ? {
            standard: Number(vals.priceVaryStandard || 0),
            normal: Number(vals.priceVaryNormal || 0),
            vip: Number(vals.priceVaryVip || 0),
          }
          : undefined,
      }
      await addServices([payload])
      router.push("/administration/charges")
    } catch (error: any) {
      console.error("Error creating charge:", error)
      alert(error.message || "Failed to create charge")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-5">
      <PageHeader title="Add Service & Charge" />
      <div className="bg-white p-6 rounded-md shadow-sm mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                name="chargeCategory"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Category</FormLabel>
                    <FormControl>
                      <DynamicSelect
                        options={cats}
                        value={field.value}
                        onChange={(v) => field.onChange(v as string)}
                        placeholder="Select Charge Category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="serviceName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Charge Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type *</FormLabel>
                    <FormControl>
                      <DynamicSelect
                        options={units}
                        value={field.value}
                        onChange={(v) => field.onChange(v as string)}
                        placeholder="Select Unit Type"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  // <FormItem>
                  //   <FormLabel>Status</FormLabel>
                  //   <div className="flex items-center justify-end gap-3">
                  //     <StatusSwitch checked={field.value} onCheckedChange={field.onChange} />
                  //   </div>
                  // </FormItem>
                  <FormItem>
                    <div className="flex flex-col rounded-md px-3">
                      <FormLabel className="pb-2">Status</FormLabel>
                      <div
                        className={`flex items-center gap-3 ${field.value ? "bg-green-50" : "bg-gray-50"
                          } h-9 px-2`}
                      >
                        <span className="text-sm text-red-500">Inactive</span>
                        <FormControl>
                          <StatusSwitch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <span
                          className={`text-sm ${field.value ? "text-green-600" : "text-gray-400"
                            }`}
                        >
                          Active
                        </span>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                name="chargeType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter charge type (e.g., Consultation)"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="taxCategory"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Category</FormLabel>
                    <FormControl>
                      <DynamicSelect
                        options={taxes}
                        value={field.value}
                        onChange={(v) => field.onChange(v as string)}
                        placeholder="Select Tax Category"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="taxPercent"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax %</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Tax"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="standardCharge"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Charge ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Standard Charge"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Price Vary On</div>
                <FormField
                  name="priceVaryOn"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center gap-3">
                      <StatusSwitch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>

              {/* Price vary section: visible only when on */}
              {form.watch("priceVaryOn") && (
                <div className="mt-4 space-y-3">
                  <FormField
                    name="priceVaryBy"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Vary By</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Select price vary dimension (e.g., Department)"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <FormField
                      name="priceVaryStandard"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Standard</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Standard price"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="priceVaryNormal"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Normal</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Normal price"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="priceVaryVip"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VIP</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="VIP price"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="text-blue-600 border-blue-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
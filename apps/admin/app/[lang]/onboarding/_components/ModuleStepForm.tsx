"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Form } from "@workspace/ui/components/form"
import { useForm } from "@workspace/ui/hooks/use-form"
import { zodResolver } from "@workspace/ui/lib/zod"
import { Button } from "@workspace/ui/components/button"
import { ModuleAssignmentSection } from "@/app/[lang]/onboarding/_components/sections/ModulesAssignmentSection"
import {
  step2Schema,
  type Step2Values,
} from "@/app/[lang]/onboarding/_components/schemas"
import { createModulesApiClient } from "@/lib/api/modules"
import { createTenantApiClient } from "@/lib/api/tenant"
import { useOnboardingStore } from "@/stores/onboarding"
import { getIdToken } from "@/lib/api"
import { ArrowLeft } from "lucide-react"

export function ModuleStepForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ lang: string }>()
  const queryClient = useQueryClient()

  const lang = params?.lang ?? "en"
  const onboardingBase = `/${lang}/onboarding`
  const createHospitalPath = `/${lang}/create-hospital`
  const hospitalId = searchParams.get("hospitalId") || "dev-hospital-1"

  const { modules: moduleState, setModules, saveModules } = useOnboardingStore()
  const [authToken, setAuthToken] = useState<string>("")

  // Retrieve token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getIdToken()
        setAuthToken(token || "")
      } catch (error) {
        console.error("Failed to get auth token:", error)
        setAuthToken("")
      }
    }
    fetchToken()
  }, [])

  useEffect(() => {
    if (!hospitalId) {
      router.replace(createHospitalPath)
    }
  }, [hospitalId, router, createHospitalPath])

  const { data: modules = [], isLoading: isLoadingModules } = useQuery({
    queryKey: ["modules", authToken],
    queryFn: async () => {
      const token = authToken || (await getIdToken()) || ""
      const client = createModulesApiClient({ authToken: token })
      const response = await client.getModules()
      return response.data.data // Extract data array from paginated response
    },
    enabled: !!authToken,
  })

  // Fetch tenant data to populate modules from backend
  const { data: tenantData } = useQuery({
    queryKey: ["tenant", hospitalId, authToken],
    queryFn: async () => {
      const token = authToken || (await getIdToken()) || ""
      const client = createTenantApiClient({ authToken: token })
      const response = await client.getTenantById(hospitalId)
      return response.data.data
    },
    enabled: !!hospitalId && !!authToken,
  })

  // Populate store with tenant modules when data loads
  useEffect(() => {
    if (tenantData?.tenant_modules !== undefined) {
      const moduleIds = tenantData.tenant_modules.map((module) =>
        String(module.id)
      )
      // Only update if different from current state - use slice() to avoid mutating original arrays
      const sortedModuleIds = [...moduleIds].sort()
      const sortedSelectedIds = [...moduleState.selectedIds].sort()
      if (
        JSON.stringify(sortedModuleIds) !== JSON.stringify(sortedSelectedIds)
      ) {
        setModules(moduleIds)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setModules is stable from Zustand
  }, [tenantData])

  const mutation = useMutation({
    mutationKey: ["tenant", "modules"],
    mutationFn: async (selectedIds: string[]) => {
      const token = authToken || (await getIdToken()) || ""
      const client = createModulesApiClient({ authToken: token })
      // Convert string IDs to numbers for the API
      const moduleIds = selectedIds
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id))
      return await client.updateModules(hospitalId, { moduleIds })
    },
    onMutate: async (selectedIds) => {
      await queryClient.cancelQueries({ queryKey: ["tenant", "modules"] })
      const previousSelectedIds = moduleState.selectedIds
      setModules(selectedIds)
      return { previousSelectedIds }
    },
    onSuccess: () => {
      saveModules()
      router.push(`${onboardingBase}/payment?hospitalId=${hospitalId}`)
    },
    onError: (error, _variables, context) => {
      // Rollback optimistic update
      if (context?.previousSelectedIds) {
        setModules(context.previousSelectedIds)
      }
      const message =
        error instanceof Error ? error.message : "Failed to save modules"
      console.error("[ModuleStepForm] Error:", message)
    },
  })

  const form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      modules: moduleState.selectedIds || [],
    },
  })

  // Watch form values for save
  const formModules = form.watch("modules") || []

  useEffect(() => {
    // Sync form with store state only on initial load or when store changes from backend
    // Only sync if form is empty and store has values (from backend)
    const formCurrent = form.getValues("modules") || []
    if (formCurrent.length === 0 && moduleState.selectedIds.length > 0) {
      form.setValue("modules", moduleState.selectedIds, {
        shouldValidate: false,
        shouldDirty: false,
      })
    }
  }, [moduleState.selectedIds, form])

  const handleSave = async () => {
    try {
      // Get current form values - use watched value which is always up-to-date
      const modulesToSave =
        formModules.length > 0 ? formModules : form.getValues("modules") || []

      mutation.mutate(modulesToSave)
    } catch (error) {
      console.error("[ModuleStepForm] Error in handleSave:", error)
    }
  }

  if (!hospitalId) {
    return null
  }

  if (isLoadingModules) {
    return (
      <div className="space-y-4">
        <div className="bg-white/80 rounded-lg p-4 md:p-6">
          <p className="text-center text-muted-foreground">
            Loading modules...
          </p>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate>
        <ModuleAssignmentSection form={form} modules={modules} />

        <div className="bg-white/80 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center relative">
          {mutation.isError && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-md border border-red-200 z-10">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Failed to save modules"}
            </div>
          )}

          <div className="flex gap-3 items-center justify-between w-full">
            <Button
              type="button"
              variant="outline"
              asChild
              className="px-4 py-2 cursor-pointer flex items-center gap-2 rounded-full"
            >
              <Link href={createHospitalPath}>
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>

            <div className="flex gap-3 items-center">
              <Button
                type="button"
                variant="secondary"
                className="px-4 py-2 cursor-pointer flex items-center gap-2 rounded-full"
                onClick={() =>
                  router.push(
                    `${onboardingBase}/payment?hospitalId=${hospitalId}`
                  )
                }
              >
                Skip
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  console.log("[ModuleStepForm] Save button clicked")
                  handleSave()
                }}
                disabled={mutation.isPending}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

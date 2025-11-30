"use client"

import { useMemo } from "react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { AppSelect } from "@/components/common/app-select"
import { useQuery } from "@tanstack/react-query"
import { createDepartmentApiClient } from "@/lib/api/administration/department"
import { createDesignationApiClient } from "@/lib/api/designations"
import { createSpecialisationApiClient } from "@/lib/api/specialisations"
import { createUserApiClient } from "@/lib/api/administration/users"

interface TopEmployeeInfoProps {
  form: any
  authToken: string
}

export function TopEmployeeInfo({ form, authToken }: TopEmployeeInfoProps) {
  // API Clients
  const departmentClient = useMemo(() => {
    if (!authToken) return null
    return createDepartmentApiClient({ authToken })
  }, [authToken])

  const designationClient = useMemo(() => {
    if (!authToken) return null
    return createDesignationApiClient({ authToken })
  }, [authToken])

  const specialisationClient = useMemo(() => {
    if (!authToken) return null
    return createSpecialisationApiClient({ authToken })
  }, [authToken])

  const userClient = useMemo(() => {
    if (!authToken) return null
    return createUserApiClient()
  }, [authToken])

  // Fetch Departments
  const { data: departmentsData, isLoading: isLoadingDepartments } = useQuery({
    queryKey: ["departments-dropdown"],
    queryFn: async () => {
      if (!departmentClient) throw new Error("API client not initialized")
      const response = await departmentClient.getDepartments({ limit: 100 })
      return response.data
    },
    enabled: !!departmentClient,
  })

  // Fetch Designations
  const { data: designationsData, isLoading: isLoadingDesignations } = useQuery(
    {
      queryKey: ["designations-dropdown"],
      queryFn: async () => {
        if (!designationClient) throw new Error("API client not initialized")
        const response = await designationClient.getDesignations({ limit: 100 })
        return response.data
      },
      enabled: !!designationClient,
    }
  )

  // Fetch Specialisations
  const { data: specialisationsData, isLoading: isLoadingSpecialisations } =
    useQuery({
      queryKey: ["specialisations-dropdown"],
      queryFn: async () => {
        if (!specialisationClient) throw new Error("API client not initialized")
        const response = await specialisationClient.getSpecialisations({
          limit: 100,
          status: "active",
        })
        return response.data
      },
      enabled: !!specialisationClient,
    })

  // Fetch Users
  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users-dropdown"],
    queryFn: async () => {
      if (!userClient) throw new Error("API client not initialized")
      const response = await userClient.getUsers({ limit: 100 })
      return response.data
    },
    enabled: !!userClient,
  })

  // Transform data to dropdown options
  const departmentOptions = useMemo(() => {
    if (!departmentsData?.data) return []
    return departmentsData.data.map((dept) => ({
      value: String(dept.id),
      label: dept.department_name,
    }))
  }, [departmentsData])

  const designationOptions = useMemo(() => {
    if (!designationsData?.data) return []
    return designationsData.data.map((des) => ({
      value: String(des.id),
      label: des.name,
    }))
  }, [designationsData])

  const specialisationOptions = useMemo(() => {
    if (!specialisationsData?.data) return []
    return specialisationsData.data.map((spec) => ({
      value: String(spec.id),
      label: spec.name,
    }))
  }, [specialisationsData])

  const userOptions = useMemo(() => {
    if (!usersData?.data) return []
    return usersData.data.map((user) => ({
      value: String(user.id),
      label: user.name,
    }))
  }, [usersData])

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-gray-200 pb-4">
      {/* Left Fields */}
      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder={isLoadingUsers ? "Loading..." : "Select User"}
                    value={field.value}
                    onChange={field.onChange}
                    options={userOptions}
                    disabled={isLoadingUsers}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder={
                      isLoadingDepartments ? "Loading..." : "Select Department"
                    }
                    value={field.value}
                    onChange={field.onChange}
                    options={departmentOptions}
                    disabled={isLoadingDepartments}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder={
                      isLoadingDesignations
                        ? "Loading..."
                        : "Select Designation"
                    }
                    value={field.value}
                    onChange={field.onChange}
                    options={designationOptions}
                    disabled={isLoadingDesignations}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialisation_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <AppSelect
                    placeholder={
                      isLoadingSpecialisations
                        ? "Loading..."
                        : "Select Specialization"
                    }
                    value={field.value}
                    onChange={field.onChange}
                    options={specialisationOptions}
                    disabled={isLoadingSpecialisations}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

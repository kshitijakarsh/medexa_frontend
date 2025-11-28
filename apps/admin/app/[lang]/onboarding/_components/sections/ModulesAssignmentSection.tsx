// components/onboard-hospital/sections/ModulesAssignmentSection.tsx

"use client"

import { useState, useRef } from "react"
import { FormField, FormItem, FormMessage } from "@workspace/ui/components/form"
import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@workspace/ui/components/popover"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
} from "@workspace/ui/components/command"
import { Badge } from "@workspace/ui/components/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { FormSection } from "../ui/FormSection"
import type { Module } from "@/lib/api/modules"

interface ModuleAssignmentSectionProps {
  form: any
  modules?: Module[]
}

export function ModuleAssignmentSection({
  form,
  modules = [],
}: ModuleAssignmentSectionProps) {
  const [open, setOpen] = useState(false)
  const selectedModules = form.watch("modules") || []
  const isSelectingRef = useRef(false)

  const toggleModule = (id: string) => {
    isSelectingRef.current = true
    const current = form.getValues("modules") || []
    if (current.includes(id)) {
      form.setValue(
        "modules",
        current.filter((m: string) => m !== id),
        { shouldDirty: true, shouldValidate: true }
      )
    } else {
      form.setValue("modules", [...current, id], {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
    // Keep popover open for multi-select - reset flag after a short delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isSelectingRef.current = false
        // Ensure popover stays open
        if (!open) {
          setOpen(true)
        }
      })
    })
  }

  const handleOpenChange = (newOpen: boolean) => {
    // Prevent closing if we just selected an item (multi-select mode)
    if (!newOpen && isSelectingRef.current) {
      // Keep it open
      return
    }
    setOpen(newOpen)
    // Reset the flag when actually closing
    if (!newOpen) {
      isSelectingRef.current = false
    }
  }

  return (
    <FormSection title="Modules Assignment">
      <FormField
        control={form.control}
        name="modules"
        render={() => (
          <FormItem className="space-y-3">
            {/* Dropdown */}
            <Popover open={open} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between bg-white"
                >
                  {selectedModules.length > 0
                    ? `${selectedModules.length} selected`
                    : "Select Modules"}
                  <ChevronsUpDown className="opacity-50 h-4 w-4 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command className="bg-white">
                  <CommandInput placeholder="Search modules..." />
                  <CommandList>
                    <CommandEmpty>No modules found.</CommandEmpty>
                    <CommandGroup>
                      {modules.map((m) => {
                        const moduleId = String(m.id)
                        const selected = selectedModules.includes(moduleId)
                        return (
                          <CommandItem
                            key={m.id}
                            value={m.name_en}
                            onSelect={() => {
                              toggleModule(moduleId)
                            }}
                            className="flex flex-col items-start gap-1 py-3 cursor-pointer"
                          >
                            <div className="flex items-center w-full">
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selected ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span className="font-medium">{m.name_en}</span>
                            </div>
                            <span className="text-xs text-muted-foreground ml-6">
                              {m.description}
                            </span>
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected modules as badges */}
            {selectedModules.length > 0 && modules.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedModules.map((id: string) => {
                  const mod = modules.find((m) => String(m.id) === id)

                  return (
                    <Badge
                      key={id}
                      className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-slate-100 text-slate-700"
                    >
                      {mod?.name_en || `Module ${id}`}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          toggleModule(id)
                        }}
                      >
                        <X
                          size={14}
                          className="cursor-pointer hover:text-red-500"
                        />
                      </Button>
                    </Badge>
                  )
                })}
              </div>
            )}

            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  )
}

// components/onboard-hospital/sections/ModulesAssignmentSection.tsx

"use client"

import { useState } from "react"
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

  const toggleModule = (id: string) => {
    const current = form.getValues("modules") || []
    if (current.includes(id)) {
      form.setValue(
        "modules",
        current.filter((m: string) => m !== id)
      )
    } else {
      form.setValue("modules", [...current, id])
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
            <Popover open={open} onOpenChange={setOpen}>
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
                        const selected = selectedModules.includes(m.id)
                        return (
                          <CommandItem
                            key={m.id}
                            onSelect={() => toggleModule(m.id)}
                            className="flex flex-col items-start gap-1 py-3"
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
            {selectedModules.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedModules.map((id: string) => {
                  const mod = modules.find((m) => m.id === id)
                  return (
                    <Badge
                      key={id}
                      className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-slate-100 text-slate-700"
                    >
                      {mod?.name_en || id}
                      <X
                        size={14}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => toggleModule(id)}
                      />
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

import { useState } from "react"
import { Input } from "@workspace/ui/components/input"
import { SearchIcon } from "lucide-react"

interface FilterInputProps {
  placeholder: string
  onValueChange?: (value: string) => void
}

export const FilterInput = ({
  placeholder,
  onValueChange,
}: FilterInputProps) => {
  const [value, setValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id="hospital-name-input"
          className="peer ps-10"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  )
}

import { Input } from "@workspace/ui/components/input"
import { SearchIcon } from "lucide-react"

export const FilterInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          id="hospital-name-input"
          className="peer ps-10"
          value={""}
          onChange={(e) => {}}
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

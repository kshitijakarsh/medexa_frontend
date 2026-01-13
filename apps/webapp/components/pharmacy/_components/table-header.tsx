import { Card, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Search, Plus, SlidersHorizontal } from "lucide-react"

interface TableHeaderProps {
  title: string
  searchQuery: string
  onSearchChange: (query: string) => void
  showAdd?: boolean
  showFilter?: boolean
  onAddClick?: () => void
  placeholder?: string
}

export function TableHeader({
  title,
  searchQuery,
  onSearchChange,
  showAdd = false,
  showFilter = false,
  onAddClick,
  placeholder = "Search...",
}: TableHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          {showFilter && (
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          )}
          {showAdd && (
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={onAddClick}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}

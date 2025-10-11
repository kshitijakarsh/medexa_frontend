import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { SERVER_RESOURCES, getResourceColor } from "./data"
import { Cpu, HardDrive, MemoryStick, Wifi } from "lucide-react"

function getIcon(name: string) {
  switch (name) {
    case "CPU Usage":
      return <Cpu className="size-5" />
    case "Memory Usage":
      return <MemoryStick className="size-5" />
    case "Disk Usage":
      return <HardDrive className="size-5" />
    case "Network I/O":
      return <Wifi className="size-5" />
    default:
      return null
  }
}

export function ServerResources() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <HardDrive className="size-5" />
          <CardTitle>Server Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVER_RESOURCES.map((resource) => (
            <div key={resource.name} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                {getIcon(resource.name)}
                <span>{resource.name}</span>
              </div>
              <div className="text-2xl font-bold">{resource.value}%</div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${getResourceColor(resource.value)}`}
                  style={{ width: `${resource.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

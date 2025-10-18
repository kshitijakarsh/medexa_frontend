import { SidebarTrigger } from "@workspace/ui/components/sidebar"

export const Header = () => {
  return (
    <div className="h-14 w-full px-4 flex items-center justify-between border-b bg-white">
      <SidebarTrigger size="icon-lg" />
    </div>
  )
}

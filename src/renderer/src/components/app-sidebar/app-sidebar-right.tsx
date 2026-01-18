import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { useMediaStore } from '@/stores/media-store'
import { SongInfo } from '@/components/app-sidebar/_index'
import { cn } from '@/lib/utils'

export function AppSidebarRight() {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  if (isIdle) return

  return (
    <Sidebar
      data-idle={isIdle}
      variant="inset"
      side="right"
      className={cn(
        'sticky top-0 hidden lg:flex',
        'data-[idle=false]:h-[calc(100svh-var(--footer-height)-3.5rem)] data-[idle=true]:h-[calc(100%-3.5rem)]'
      )}
    >
      <SidebarContent className="bg-background rounded-lg">
        <SongInfo />
      </SidebarContent>
    </Sidebar>
  )
}

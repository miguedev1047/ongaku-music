import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu
} from '@/components/ui/sidebar'
import { PlaylistList, PlaylistSkeleton } from '@/components/playlists/_index'
import { NavMain } from '@/components/app-sidebar/_index'
import { PlaylistDialogContainer } from '@/components/dialogs/playlist/_index'
import { Suspense } from 'react'
import { useMediaStore } from '@/stores/media-store'
import { cn } from '@/lib/utils'
import { NavMainSkeleton } from '@/components/skeletons'

export function AppSidebarLeft() {
  const isIdle = useMediaStore((state) => state.state === 'idle')

  return (
    <PlaylistDialogContainer>
      <Sidebar
        data-idle={isIdle}
        variant="inset"
        className={cn(
          'top-(--header-height) data-[idle=false]:h-[calc(100%-var(--footer-height)-3.5rem)] data-[idle=true]:h-[calc(100%-3.5rem)]'
        )}
      >
        <SidebarHeader className="bg-background rounded-t-lg">
          <SidebarMenu>
            <Suspense fallback={<NavMainSkeleton />}>
              <NavMain />
            </Suspense>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-background flex flex-col rounded-b-lg">
          <SidebarGroup className="flex flex-col flex-1">
            <SidebarGroupLabel>My playlists</SidebarGroupLabel>
            <SidebarGroupContent className="flex-1 min-h-0">
              <SidebarMenu className="h-full">
                <Suspense fallback={<PlaylistSkeleton />}>
                  <PlaylistList />
                </Suspense>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </PlaylistDialogContainer>
  )
}

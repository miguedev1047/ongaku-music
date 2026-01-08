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
import { DialogActionsContainer } from '@/components/dialog-actions/_index'
import { Suspense } from 'react'
import { useMediaStore } from '@/stores/media-store'
import { cn } from '@/lib/utils'
import { NavMainSkeleton } from '@/components/skeletons'

export function AppSidebarLeft() {
  const isIdle = useMediaStore((state) => state.state === 'idle')

  return (
    <DialogActionsContainer>
      <Sidebar
        data-idle={isIdle}
        className={cn(
          'data-[idle=false]:h-[calc(100%-var(--footer-height))] data-data-[idle=true]:h-full'
        )}
      >
        <SidebarHeader>
          <SidebarMenu>
            <Suspense fallback={<NavMainSkeleton />}>
              <NavMain />
            </Suspense>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="flex flex-col">
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
    </DialogActionsContainer>
  )
}

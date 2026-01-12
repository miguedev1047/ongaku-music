import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { PlaylistModel } from '@shared/models'
import { Link } from '@tanstack/react-router'
import { ListMusic } from 'lucide-react'
import { PlaylistItemDropdown } from '@/components/playlists/_index'

export function PlaylistItem(props: PlaylistModel) {
  const { title } = props
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          activeProps={{ className: 'bg-sidebar-accent' }}
          to="/playlist/$title"
          preload="intent"
          params={{ title }}
        >
          <ListMusic />
          {title}
        </Link>
      </SidebarMenuButton>
      <PlaylistItemDropdown {...props} />
    </SidebarMenuItem>
  )
}

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useDialogStore } from '@/stores/dialog-action-store'
import { Plus } from 'lucide-react'

export function NewPlaylist() {
  const open = useDialogStore((state) => state.open)

  const handleNewPlaylist = () => {
    open('playlist', 'new', null)
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={handleNewPlaylist}>
        <Plus />
        New Playlist
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useDialogStore } from '@/stores/dialog-action-store'
import { Search } from 'lucide-react'
import { SearchPlaylist as SearchPlaylistDialog } from '@/components/searchs/_index'

export function SearchPlaylist() {
  const open = useDialogStore((state) => state.open)

  const handleSearchPlaylist = () => {
    open('playlist', 'search', null)
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={handleSearchPlaylist}>
          <Search />
          Search Playlist
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SearchPlaylistDialog />
    </>
  )
}

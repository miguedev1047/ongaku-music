import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useDialogStore } from '@/stores/dialog-action-store'
import { Search } from 'lucide-react'
import { SearchPlaylist as SearchPlaylistDialog } from '@/components/searchs/_index'
import { Kbd } from '@/components/ui/kbd'

export function SearchPlaylist() {
  const open = useDialogStore((state) => state.open)

  const handleSearchPlaylist = () => {
    open('playlist', 'search', null)
  }

  return (
    <>
      <SidebarMenuItem className="group/kbd">
        <SidebarMenuButton onClick={handleSearchPlaylist}>
          <Search />
          Search Playlist
          <div className="flex flex-1 justify-end opacity-0 group-hover/kbd:opacity-100">
            <Kbd>Ctrl + P</Kbd>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SearchPlaylistDialog />
    </>
  )
}

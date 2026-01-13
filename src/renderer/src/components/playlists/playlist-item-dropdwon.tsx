import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenuAction } from '@/components/ui/sidebar'
import { useDialogStore } from '@/stores/dialog-action-store'
import { PlaylistModel } from '@shared/models'
import { Ellipsis, Folder, Pencil, Trash } from 'lucide-react'
import { memo } from 'react'

export function PlaylistItemDropdownMemoized(props: PlaylistModel) {
  const playlist = props

  const open = useDialogStore((state) => state.open)
  const isDefaultPlaylist = playlist.title === 'Default'

  const handleOpenFolder = async () => {
    await window.api.openFolderPlaylist(playlist.title)
  }

  const handleRemovePlaylist = () => {
    if (isDefaultPlaylist) return
    open('playlist', 'remove', { playlist })
  }

  const handleRenamePlaylist = () => {
    if (isDefaultPlaylist) return
    open('playlist', 'rename', { playlist })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>
          <Ellipsis />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleOpenFolder}>
          <Folder />
          Open
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isDefaultPlaylist} onClick={handleRenamePlaylist}>
          <Pencil />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isDefaultPlaylist}
          onClick={handleRemovePlaylist}
          variant="destructive"
        >
          <Trash />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const PlaylistItemDropdown = memo(PlaylistItemDropdownMemoized)

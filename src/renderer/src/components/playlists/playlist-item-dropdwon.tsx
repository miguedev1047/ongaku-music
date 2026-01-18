import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenuAction } from '@/components/ui/sidebar'
import { useDialogStore } from '@/stores/dialog-action-store'
import { useDownloadStore } from '@/stores/download-store'
import { PlaylistModel } from '@shared/models'
import { Ellipsis, Folder, Pencil, Trash } from 'lucide-react'
import { memo } from 'react'

export function PlaylistItemDropdownMemoized(props: PlaylistModel) {
  const playlist = props
  const open = useDialogStore((state) => state.open)
  const isActiveDownload = useDownloadStore((state) => state.isDownloading)
  const activePlaylist = useDownloadStore((state) => state.selectedPlaylist)

  const isSamePlaylist = playlist.title === activePlaylist
  const isLocked = isActiveDownload && isSamePlaylist

  const handleOpenFolder = async () => {
    await window.api.openFolderPlaylist(playlist.title)
  }

  const handleRemovePlaylist = () => {
    if (isLocked) return
    open('playlist', 'remove', { playlist })
  }

  const handleRenamePlaylist = () => {
    if (isLocked) return
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
        <DropdownMenuItem disabled={isLocked} onClick={handleRenamePlaylist}>
          <Pencil />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isLocked} onClick={handleRemovePlaylist} variant="destructive">
          <Trash />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const PlaylistItemDropdown = memo(PlaylistItemDropdownMemoized)

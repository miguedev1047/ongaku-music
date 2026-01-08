import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenuAction } from '@/components/ui/sidebar'
import { useDialogActionStore } from '@/stores/dialog-action-store'
import { PlaylistModel } from '@shared/models'
import { Ellipsis, Folder, Pencil, Trash } from 'lucide-react'
import { memo } from 'react'

export const PlaylistItemDropdown = memo(PlaylistItemDropdownMemoized)

export function PlaylistItemDropdownMemoized(props: PlaylistModel) {
  const openDialog = useDialogActionStore((state) => state.openDialog)
  const setPlaylist = useDialogActionStore((state) => state.setPlaylist)

  const handleOpenFolder = async () => {
    await window.api.openFolderPlaylist(props.playlist)
  }

  const handleRemovePlaylist = () => {
    openDialog('remove')
    setPlaylist(props)
  }

  const handleRenamePlaylist = () => {
    openDialog('rename')
    setPlaylist(props)
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
        <DropdownMenuItem onClick={handleRenamePlaylist}>
          <Pencil />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRemovePlaylist} variant="destructive">
          <Trash />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

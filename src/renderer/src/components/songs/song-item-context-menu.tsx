import {
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenu
} from '@/components/ui/context-menu'
import { SongModel } from '@shared/models'
import { Folder, Heart, Pencil, Trash } from 'lucide-react'
import { useDialogStore } from '@/stores/dialog-action-store'
import { memo } from 'react'
import { useMediaStore } from '@/stores/media-store'

interface SongItemContextMenuProps extends React.PropsWithChildren {
  song: SongModel
}

function SongItemContextMenuMemoized({ children, song }: SongItemContextMenuProps) {
  const isPlayingThisSong = useMediaStore((state) => state.currentSong?.id === song.id)
  const open = useDialogStore((state) => state.open)

  const handleRename = () => {
    if (isPlayingThisSong) return
    open('song', 'rename', { song })
  }

  const handleRemove = () => {
    if (isPlayingThisSong) return
    open('song', 'remove', { song })
  }

  const handleMove = () => {
    if (isPlayingThisSong) return
    open('song', 'move', { song })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleRename} disabled={isPlayingThisSong}>
          <Pencil />
          Rename
        </ContextMenuItem>
        <ContextMenuItem onClick={handleMove} disabled={isPlayingThisSong}>
          <Folder />
          Move
        </ContextMenuItem>
        <ContextMenuItem>
          <Heart />
          Mark as favorite
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleRemove} disabled={isPlayingThisSong} variant="destructive">
          <Trash />
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const SongItemContextMenu = memo(SongItemContextMenuMemoized)

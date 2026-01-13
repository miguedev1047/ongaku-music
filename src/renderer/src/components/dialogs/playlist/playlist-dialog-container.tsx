import {
  NewPlaylistDialog,
  RenamePlaylistDialog,
  RemovePlaylistDialog
} from '@/components/dialogs/playlist/_index'
import { Dialog } from '@/components/ui/dialog'
import { useDialogStore } from '@/stores/dialog-action-store'

const actions = {
  new: NewPlaylistDialog,
  rename: RenamePlaylistDialog,
  remove: RemovePlaylistDialog
}

export function PlaylistDialogContainer({ children }: React.PropsWithChildren) {
  const isOpen = useDialogStore((state) => state.dialog.key === 'playlist' && state.dialog.isOpen)
  const toggle = useDialogStore((state) => state.toggle)

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      {children}
      <PlaylistDialogActions />
    </Dialog>
  )
}

export function PlaylistDialogActions() {
  const dialog = useDialogStore((state) => state.dialog)
  const isOpen = useDialogStore((state) => state.dialog.key === 'playlist' && state.dialog.isOpen)
  const ActionComponent = actions[dialog.action as keyof typeof actions]
  if (!ActionComponent || !isOpen) return null
  return <ActionComponent />
}

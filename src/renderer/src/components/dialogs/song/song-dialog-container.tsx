import {
  RemoveSongDialog,
  MoveSongDialog,
  RenameSongDialog
} from '@/components/dialogs/song/_index'
import { Dialog } from '@/components/ui/dialog'
import { useDialogStore } from '@/stores/dialog-action-store'

const actions = {
  rename: RenameSongDialog,
  remove: RemoveSongDialog,
  move: MoveSongDialog
}

export function SongDialogContainer({ children }: React.PropsWithChildren) {
  const isOpen = useDialogStore((state) => state.dialog.key === 'song' && state.dialog.isOpen)
  const toggle = useDialogStore((state) => state.toggle)

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      {children}
      <SongDialogActions />
    </Dialog>
  )
}

export function SongDialogActions() {
  const dialog = useDialogStore((state) => state.dialog)
  const isOpen = useDialogStore((state) => state.dialog.key === 'song' && state.dialog.isOpen)
  const ActionComponent = actions[dialog.action as keyof typeof actions]
  if (!ActionComponent || !isOpen) return null
  return <ActionComponent />
}

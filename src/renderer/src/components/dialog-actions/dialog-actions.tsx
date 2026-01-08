import {
  NewPlaylistDialog,
  RemovePlaylistDialog,
  RenamePlaylistDialog
} from '@/components/dialog-actions/_index'
import { useDialogActionStore } from '@/stores/dialog-action-store'

export function DialogActions() {
  const { type } = useDialogActionStore()

  if (type === 'new') {
    return <NewPlaylistDialog />
  }
  if (type === 'rename') {
    return <RenamePlaylistDialog />
  }
  if (type === 'remove') {
    return <RemovePlaylistDialog />
  }

  return null
}

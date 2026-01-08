import { Dialog } from '@/components/ui/dialog'
import { DialogActions } from '@/components/dialog-actions/_index'
import { useDialogActionStore } from '@/stores/dialog-action-store'

export function DialogActionsContainer({ children }: React.PropsWithChildren) {
  const { isOpen, toggleOpen } = useDialogActionStore()

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      {children}
      <DialogActions />
    </Dialog>
  )
}

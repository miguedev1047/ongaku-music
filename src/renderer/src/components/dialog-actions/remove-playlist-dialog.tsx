import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDialogActionStore } from '@/stores/dialog-action-store'
import { toast } from 'sonner'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleAlert } from 'lucide-react'

export function RemovePlaylistDialog() {
  const selectedPlaylist = useDialogActionStore((state) => state.selectedPlaylist)
  const closeDialog = useDialogActionStore((state) => state.closeDialog)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const location = useLocation()
  const isOnPlaylistRoute = location.pathname.includes('playlist')

  const handleRemovePlaylist = async () => {
    const oldPlaylistName = selectedPlaylist?.title ?? ''

    const response = await window.api.removePlaylist(oldPlaylistName)

    if (response.code === 'ERROR') {
      toast.error(response.message)
      return
    }

    queryClient.removeQueries({ queryKey: ['playlist', oldPlaylistName] })

    if (isOnPlaylistRoute) {
      navigate({ to: '/' })
    }

    closeDialog()
    toast.success(response.message)
    queryClient.invalidateQueries({ queryKey: ['playlists'] })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Remove playlist </DialogTitle>
        <DialogDescription> Remove playlist folder. </DialogDescription>
      </DialogHeader>

      <Alert>
        <CircleAlert />
        <AlertTitle>Are you sure you want to remove this playlist?</AlertTitle>
        <AlertDescription> This action cannot be undone. </AlertDescription>
      </Alert>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleRemovePlaylist}>
          Remove playlist
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

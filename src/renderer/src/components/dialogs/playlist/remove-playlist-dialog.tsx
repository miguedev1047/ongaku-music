import type { PlaylistPayloadProps } from '@/components/dialogs/_types'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleAlert } from 'lucide-react'
import { useDialogStore } from '@/stores/dialog-action-store'

export function RemovePlaylistDialog() {
  const dialog = useDialogStore((state) => state.dialog as PlaylistPayloadProps)
  const close = useDialogStore((state) => state.close)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const location = useLocation()
  const playlistName = dialog.payload.playlist.title ?? ''
  const isOnPlaylistRoute = location.pathname.includes('playlist')

  const handleRemovePlaylist = async () => {
    const response = await window.api.removePlaylist(playlistName)

    if (response.code === 'ERROR') {
      toast.error(response.message)
      return
    }

    queryClient.removeQueries({ queryKey: ['playlist', playlistName] })

    if (isOnPlaylistRoute) {
      navigate({ to: '/' })
    }

    close()
    toast.success(response.message)
    queryClient.invalidateQueries({ queryKey: ['playlists'] })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Remove &quot;{playlistName}&quot; playlist </DialogTitle>
        <DialogDescription> Remove playlist folder. </DialogDescription>
      </DialogHeader>

      <Alert>
        <CircleAlert />
        <AlertTitle>Are you sure you want to remove this playlist?</AlertTitle>
        <AlertDescription> This action cannot be undone. </AlertDescription>
      </Alert>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleRemovePlaylist}>
          Remove playlist
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

import type { SongPayloadProps } from '@/components/dialogs/_types'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDialogStore } from '@/stores/dialog-action-store'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleAlert } from 'lucide-react'
import { useMediaStore } from '@/stores/media-store'

export function RemoveSongDialog() {
  const queryClient = useQueryClient()

  const dialog = useDialogStore((state) => state.dialog as SongPayloadProps)
  const close = useDialogStore((state) => state.close)

  const currentSong = useMediaStore((state) => state.currentSong)
  const isPlayingThisSong = dialog.payload.song.id === currentSong?.id
  const playlistName = dialog.payload.song.playlist
  const songName = dialog.payload.song.fileName

  const handleRemoveSong = async () => {
    if (isPlayingThisSong) {
      toast.error("You can't remove the song while it's playing")
      return
    }

    const response = await window.api.removeSong({ playlistName, songName })

    if (response.code === 'ERROR') {
      toast.error(response.message)
      return
    }

    queryClient.removeQueries({ queryKey: ['playlist', songName] })

    close()
    toast.success(response.message)
    queryClient.invalidateQueries({ queryKey: ['playlist', playlistName] })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Remove song</DialogTitle>
        <DialogDescription> Remove song from this playlist. </DialogDescription>
      </DialogHeader>

      <Alert>
        <CircleAlert />
        <AlertTitle>Are you sure you want to remove this song?</AlertTitle>
        <AlertDescription>The song will be removed from this playlist.</AlertDescription>
        <AlertDescription>This action cannot be undone.</AlertDescription>
      </Alert>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleRemoveSong}>
          Remove song
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

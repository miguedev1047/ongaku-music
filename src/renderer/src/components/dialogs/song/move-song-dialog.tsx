import type { SongPayloadProps } from '@/components/dialogs/_types'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useDialogStore } from '@/stores/dialog-action-store'
import { toast } from 'sonner'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Folder } from 'lucide-react'
import { playlistNameSchema } from '@shared/schemas'
import { useMediaStore } from '@/stores/media-store'

export function MoveSongDialog() {
  const queryClient = useQueryClient()

  const dialog = useDialogStore((state) => state.dialog as SongPayloadProps)
  const close = useDialogStore((state) => state.close)

  const currentSong = useMediaStore((state) => state.currentSong)
  const isPlayingThisSong = dialog.payload.song.id === currentSong?.id

  const currentPlaylist = dialog.payload.song.playlist
  const fileSource = dialog.payload.song.path
  const fileName = dialog.payload.song.fileName

  const { data } = useQuery(playlistQueryOpts)
  const playlists = data?.filter((playlist) => playlist.title !== currentPlaylist) ?? []

  const form = useForm({
    defaultValues: { playlistName: '' },
    validators: {
      onSubmit: playlistNameSchema
    },
    onSubmit: async ({ value }) => {
      if (isPlayingThisSong) {
        toast.error("You can't move the song while it's playing")
        return
      }

      const playlistName = value.playlistName

      if (!currentPlaylist) {
        toast.error('Playlist not found')
        return
      }

      if (!fileSource) {
        toast.error('File not found')
        return
      }

      const response = await window.api.moveSong({
        fileSource,
        playlistName: playlistName,
        fileName
      })

      if (response.code === 'ERROR') {
        toast.error(response.message)
        return
      }

      close()
      queryClient.invalidateQueries({ queryKey: ['playlist', currentPlaylist] })
      queryClient.invalidateQueries({ queryKey: ['playlist', playlistName] })
      toast.success(response.message)
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Move song</DialogTitle>
        <DialogDescription>Move song to another playlist.</DialogDescription>
      </DialogHeader>

      <form
        id="move-song-form"
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="playlistName">Current playlist</FieldLabel>
            <Input
              readOnly
              disabled
              id="playlistName"
              name="playlistName"
              defaultValue={currentPlaylist}
            />
            <FieldDescription>This is the current playlist</FieldDescription>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <form.Field name="playlistName">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Select playlist</FieldLabel>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a playlist" />
                    </SelectTrigger>
                    <SelectContent>
                      {playlists.map((playlist) => (
                        <SelectItem key={playlist.title} value={playlist.title}>
                          <Folder />
                          {playlist.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldDescription>Move the song to another playlist.</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" form="move-song-form">
          Move
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

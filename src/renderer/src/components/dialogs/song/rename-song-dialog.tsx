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
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { songNameSchema } from '@shared/schemas'
import { toast } from 'sonner'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useMediaStore } from '@/stores/media-store'

export function RenameSongDialog() {
  const queryClient = useQueryClient()

  const dialog = useDialogStore((state) => state.dialog as SongPayloadProps)
  const close = useDialogStore((state) => state.close)

  const currentSong = useMediaStore((state) => state.currentSong)
  const isPlayingThisSong = dialog.payload.song.id === currentSong?.id

  const originalSong = dialog.payload.song
  const originalTitle = originalSong.title
  const originalFileName = originalSong.fileName
  const fileExtension = originalSong.extension
  const playlistName = originalSong.playlist

  const form = useForm({
    defaultValues: {
      songName: originalTitle
    },
    validators: {
      onSubmit: songNameSchema
    },
    onSubmit: async ({ value }) => {
      if (isPlayingThisSong) {
        toast.error("You can't rename the song while it's playing")
        return
      }

      const nextFileName = `${value.songName}${fileExtension}`

      if (!originalFileName || !nextFileName) {
        toast.error('Song not found!')
        return
      }

      const response = await window.api.renameSong({
        oldName: originalFileName,
        newName: nextFileName,
        playlistName
      })

      if (response.code === 'ERROR') {
        toast.error(response.message)
        return
      }

      close()
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['playlist', playlistName] })
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename Song</DialogTitle>
        <DialogDescription> Rename song file.</DialogDescription>
      </DialogHeader>

      <form
        id="rename-song-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="songName">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Rename song</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={originalTitle}
                    autoComplete="off"
                  />
                  <FieldDescription>Rename this song.</FieldDescription>
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
        <Button type="submit" form="rename-song-form">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

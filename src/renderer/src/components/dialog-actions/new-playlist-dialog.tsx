import type { ResponseModel } from '@shared/models'

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { playlistNameSchema } from '@shared/schemas'
import { useForm } from '@tanstack/react-form'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDialogActionStore } from '@/stores/dialog-action-store'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'

export function NewPlaylistDialog() {
  const { closeDialog } = useDialogActionStore()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: {
      playlistName: ''
    },
    validators: {
      onSubmit: playlistNameSchema
    },
    onSubmit: async ({ value }) => {
      const newPlaylist = value.playlistName

      const response: ResponseModel = await window.api.newPlaylist(newPlaylist)

      if (response.code === 'ERROR') {
        toast.error(response.message)
        return
      }

      navigate({ to: '/playlist/$title', params: { title: newPlaylist } })
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
      toast.success(response.message)
      closeDialog()
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New playlist</DialogTitle>
        <DialogDescription>Add a new playlist</DialogDescription>
      </DialogHeader>

      <form
        id="new-playlist-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="playlistName">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Playlist name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Rock's playlist"
                    autoComplete="off"
                  />
                  <FieldDescription>Provide a playlist name.</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>
        <Button type="submit" form="new-playlist-form">
          New playlist
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

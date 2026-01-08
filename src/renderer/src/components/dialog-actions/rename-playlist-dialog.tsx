import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { playlistNameSchema } from '@shared/schemas'
import { useQueryClient } from '@tanstack/react-query'
import { useDialogActionStore } from '@/stores/dialog-action-store'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function RenamePlaylistDialog() {
  const selectedPlaylist = useDialogActionStore((state) => state.selectedPlaylist)
  const closeDialog = useDialogActionStore((state) => state.closeDialog)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const location = useLocation()
  const isOnPlaylistRoute = location.pathname.includes('playlist')

  const oldPlaylistName = selectedPlaylist?.title

  const form = useForm({
    defaultValues: {
      playlistName: oldPlaylistName
    },
    validators: {
      onSubmit: playlistNameSchema
    },
    onSubmit: async ({ value }) => {
      const newPlaylistName = value.playlistName

      if (!oldPlaylistName || !newPlaylistName) {
        toast.error('Playlist not found!')
        return
      }

      const response = await window.api.renamePlaylist({
        newName: newPlaylistName,
        oldName: oldPlaylistName
      })

      if (response.code === 'ERROR') {
        toast.error(response.message)
        return
      }

      queryClient.removeQueries({ queryKey: ['playlist', oldPlaylistName] })

      if (isOnPlaylistRoute) {
        navigate({ to: '/playlist/$title', params: { title: newPlaylistName } })
      }

      closeDialog()
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Rename playlist </DialogTitle>
        <DialogDescription> Rename playlist folder. </DialogDescription>
      </DialogHeader>

      <form
        id="rename-playlist-form"
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
                  <FieldLabel htmlFor={field.name}>Rename playlist</FieldLabel>
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
                  <FieldDescription>Rename this playlist.</FieldDescription>
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
        <Button type="submit" form="rename-playlist-form">
          Rename playlist
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

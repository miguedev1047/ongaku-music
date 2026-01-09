import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { DOWNLOAD_OPTS } from '@/constants/general'
import { DownloadCloud, Folder } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { downloadSongSchema } from '@shared/schemas'
import { Input } from '@/components/ui/input'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { getFinalUrl } from '@/helpers/get-final-url'
import { toast } from 'sonner'
import { useDownloadStore } from '@/stores/download-store'
import { DownloadInfo } from '@/components/shared/download-info'

export function DownloadForm() {
  const queryClient = useQueryClient()

  const isDownloading = useDownloadStore((state) => state.isDownloading)
  const setIsDownloading = useDownloadStore((state) => state.setIsDownloading)
  const setProgress = useDownloadStore((state) => state.setProgress)

  const { data: playlists } = useSuspenseQuery(playlistQueryOpts)

  // useEffect(() => {
  //   const unsuscribe = window.api.onDownloadProgress((progress) => {
  //     setProgress(progress)
  //   })
  //   return unsuscribe
  // }, [])

  const form = useForm({
    defaultValues: {
      url: '',
      playlistName: '',
      downloadOption: 'only-song'
    },
    validators: {
      onSubmit: downloadSongSchema
    },
    onSubmit: async ({ value }) => {
      setIsDownloading(true)

      const finalUrl = getFinalUrl({
        option: value.downloadOption,
        url: value.url
      })

      const response = await window.api.downloadSong({
        playlistName: value.playlistName,
        songUrl: finalUrl
      })

      if (response.code === 'ERROR') {
        toast.error(response.message)
        setIsDownloading(false)
        return
      }

      toast.success(response.message)
      form.setFieldValue('url', '')
      setProgress(null)
      setIsDownloading(false)
      queryClient.invalidateQueries({ queryKey: ['playlist', value.playlistName] })
    }
  })

  return (
    <form
      id="download-song-form"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Download a song</CardTitle>
          <CardDescription>
            Enter a URL to download a song from supported platforms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <DownloadInfo />

            <FieldGroup className="col-span-2">
              <form.Field name="url">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Url</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        disabled={isDownloading}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="https://www.youtube.com/watch?v=PC82Z9e2Mi4"
                        autoComplete="off"
                      />
                      <FieldDescription>Provide a url song.</FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>

            <FieldGroup>
              <form.Field name="playlistName">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Playlist</FieldLabel>
                      <Select
                        disabled={isDownloading}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a playlist" />
                        </SelectTrigger>
                        <SelectContent>
                          {playlists?.map((playlist) => (
                            <SelectItem key={playlist.title} value={playlist.title}>
                              <Folder />
                              {playlist.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>Select a playlist.</FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>

            <FieldGroup>
              <form.Field name="downloadOption">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Download Option</FieldLabel>
                      <Select
                        disabled={isDownloading}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a download option" />
                        </SelectTrigger>
                        <SelectContent>
                          {DOWNLOAD_OPTS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>Select a download option.</FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
          </div>
        </CardContent>
        <CardFooter>
          <CardAction>
            <RainbowButton disabled={isDownloading} type="submit">
              <DownloadCloud />
              {isDownloading ? 'Downloading...' : 'Download'}
            </RainbowButton>
          </CardAction>
        </CardFooter>
      </Card>
    </form>
  )
}

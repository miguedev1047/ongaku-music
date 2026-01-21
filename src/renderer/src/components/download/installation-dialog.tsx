import { INSTALL_COMMANDS } from '@/constants/install-commands'
import type { DetectDependenciesModel } from '@shared/models'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { AlertCircle, Info } from 'lucide-react'
import { Field, FieldDescription, FieldLabel } from '../ui/field'
import { CodeBlockCommand } from '../code-block-command'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

interface InstallationDialogProps {
  data: DetectDependenciesModel
  normalizedPlatform: 'windows' | 'linux' | 'macos'
}

export function InstallationDialog({ data, normalizedPlatform }: InstallationDialogProps) {
  const commands = INSTALL_COMMANDS[normalizedPlatform]

  const missingDeps: string[] = []

  if (data.ytdlp) missingDeps.push('yt-dlp')
  if (data.ffmpeg) missingDeps.push('ffmpeg')

  let stepNumber = 0

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" aria-label="How to install missing dependencies">
          <Info className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-180">
        <DialogHeader>
          <DialogTitle>Install Dependencies</DialogTitle>
          <DialogDescription>
            Quick guide on how to install the missing dependencies for{' '}
            <span className="font-medium capitalize">{normalizedPlatform}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {!data.ytdlp && commands && (
            <Field>
              <FieldLabel>Step {++stepNumber}: Install yt-dlp</FieldLabel>
              <CodeBlockCommand
                __windows__={INSTALL_COMMANDS.windows?.ytdlp}
                __linux__={INSTALL_COMMANDS.linux?.ytdlp}
                __macos__={INSTALL_COMMANDS.macos?.ytdlp}
              />
            </Field>
          )}

          {!data.ffmpeg && commands && (
            <Field>
              <FieldLabel>Step {stepNumber++}: Install ffmpeg</FieldLabel>
              <CodeBlockCommand
                __windows__={INSTALL_COMMANDS.windows?.ffmpeg}
                __linux__={INSTALL_COMMANDS.linux?.ffmpeg}
                __macos__={INSTALL_COMMANDS.macos?.ffmpeg}
              />
            </Field>
          )}

          <Field>
            <FieldLabel>Step {++stepNumber}: Restart the application</FieldLabel>
            <FieldDescription>
              After installing the dependencies, restart the application to detect the changes and
              enable downloads.
            </FieldDescription>
          </Field>

          {!commands && (
            <Alert>
              <AlertCircle className="size-4" />
              <AlertTitle>Unknown Platform</AlertTitle>
              <AlertDescription>
                We couldn&apos;t determine the exact commands for your platform ({data.platform}).
                Please install yt-dlp and ffmpeg manually using your system&apos;s package manager.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

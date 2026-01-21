import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from '@/components/ui/item'
import {
  InstallationDialog,
  DependencyItem,
  RefreshDependencies
} from '@/components/download/_index'
import { detectDependenciesQuery } from '@/queries/detect-depdencies-queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { normalizePlatform } from '@/lib/normalized-platform'

export function DownloadAlert() {
  const { data } = useSuspenseQuery(detectDependenciesQuery)
  const normalizedPlatform = normalizePlatform(data.platform)

  if (!data.supported) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Downloads Not Supported</AlertTitle>
        <AlertDescription>
          Your system ({data.platform || 'Unknown'}) is not supported for downloads at this time.
        </AlertDescription>
      </Alert>
    )
  }

  if (!data.ytdlp || !data.ffmpeg) {
    const missingCount = [data.ytdlp, data.ffmpeg].filter(Boolean).length

    return (
      <Item variant="outline" role="alert" aria-live="polite">
        <ItemMedia variant="icon">
          <AlertCircle />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Missing {missingCount === 1 ? 'Dependency' : 'Dependencies'}</ItemTitle>
          <ItemDescription className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <DependencyItem name="yt-dlp" isInstalled={data.ytdlp} />
            <DependencyItem name="ffmpeg" isInstalled={data.ffmpeg} />
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <RefreshDependencies />
          <InstallationDialog data={data} normalizedPlatform={normalizedPlatform} />
        </ItemActions>
      </Item>
    )
  }

  return null
}

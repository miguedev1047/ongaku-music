import { useDownloadStore } from '@/stores/download-store'
import { Progress } from '@/components/ui/progress'
import { ShimmeringText } from '@/components/ui/shimmering-text'
import { getStatusText } from '@/helpers/get-status-download-text'

export function DownloadInfo() {
  const { progress, info, isDownloading } = useDownloadStore()

  if (!progress || !info || !isDownloading) return null

  const isPlaylist = info._type === 'playlist'
  const phase = progress.percentage === 100 ? 'processing' : 'downloading'

  const statusText = getStatusText(phase, isPlaylist)

  return (
    <div className="col-span-2 space-y-2 rounded-md bg-accent p-4">
      <div className="flex items-center justify-between text-xs font-medium">
        <div className="flex w-full gap-2">
          <ShimmeringText text={statusText} />
          <p className="line-clamp-1 max-w-80 w-full text-muted-foreground">{info.title}</p>
        </div>

        <span className="tabular-nums">{progress.percentage_str}</span>
      </div>

      <Progress value={progress.percentage} />

      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>
          {progress.downloaded_str} / {progress.total_str}
        </span>

        <div className="flex gap-3">
          {progress.speed > 0 && <span>{progress.speed_str}</span>}
          {progress.eta > 0 && <span>ETA {progress.eta_str}</span>}
        </div>
      </div>
    </div>
  )
}

import { useDownloadStore } from '@/stores/download-store'
import { Progress } from '@/components/ui/progress'
import { ShimmeringText } from '@/components/ui/shimmering-text'

export function DownloadInfo() {
  const progress = useDownloadStore((state) => state.progress)
  const info = useDownloadStore((state) => state.info)
  const isDownloading = useDownloadStore((state) => state.isDownloading)

  if (!progress || !info || !isDownloading) return null

  const isProcessing = progress.percentage === 100

  return (
    <div className="col-span-2 space-y-2 rounded-md bg-accent p-4">
      <div className="flex items-center justify-between text-xs font-medium">
        <div className="flex min-w-0 items-center gap-2">
          <ShimmeringText text={isProcessing ? 'Processing…' : 'Downloading…'} />
          <span className="line-clamp-1 text-muted-foreground">{info.title}</span>
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

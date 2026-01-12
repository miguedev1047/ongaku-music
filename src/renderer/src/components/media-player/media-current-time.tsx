import { formatTime } from '@/helpers/format-time'
import { useMediaStore } from '@/stores/media-store'

export function MediaCurrentTime() {
  const currentTime = useMediaStore((state) => state.currentTime)
  const duration = useMediaStore((state) => state.duration)
  return (
    <div className="text-xs font-medium text-muted-foreground">
      <span>{formatTime(currentTime)}</span>/<span>{formatTime(duration)}</span>
    </div>
  )
}

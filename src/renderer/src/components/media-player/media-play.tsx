import { Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMediaPlay } from '@/hooks/use-media-player'

export function MediaPlay() {
  const { isPlaying, isIdle, handleTogglePlay } = useMediaPlay()

  return (
    <Button variant="ghost" size="icon-lg" disabled={isIdle} onClick={handleTogglePlay}>
      {isPlaying ? <Pause className="size-8" /> : <Play className="size-8" />}
    </Button>
  )
}

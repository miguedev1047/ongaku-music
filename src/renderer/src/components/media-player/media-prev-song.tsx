import { Button } from '@/components/ui/button'
import { useMediaPrevSong } from '@/hooks/use-media-player'
import { SkipBackIcon } from 'lucide-react'

export function MediaPrevSong() {
  const { currentSong, isIdle, handlePrevSong } = useMediaPrevSong()

  return (
    <Button variant="ghost" size="icon" onClick={handlePrevSong} disabled={!currentSong || isIdle}>
      <SkipBackIcon />
    </Button>
  )
}

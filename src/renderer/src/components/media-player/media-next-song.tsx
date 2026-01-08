import { Button } from '@/components/ui/button'
import { useMediaNextSong } from '@/hooks/use-media-player'
import { SkipForwardIcon } from 'lucide-react'

export function MediaNextSong() {
  const { currentSong, isIdle, handleNextSong } = useMediaNextSong()

  return (
    <Button variant="ghost" size="icon" onClick={handleNextSong} disabled={!currentSong || isIdle}>
      <SkipForwardIcon />
    </Button>
  )
}

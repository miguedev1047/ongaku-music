import { Button } from '@/components/ui/button'
import { ShuffleIcon } from 'lucide-react'
import { useMediaShuffle } from '@/hooks/use-media-player'

export function MediaShuffle() {
  const { isIdle, isShuffle, handleToggleShuffle } = useMediaShuffle()

  return (
    <Button
      size="icon"
      variant={isShuffle ? 'default' : 'ghost'}
      onClick={handleToggleShuffle}
      disabled={isIdle}
    >
      <ShuffleIcon />
    </Button>
  )
}

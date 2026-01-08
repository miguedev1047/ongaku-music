import { Button } from '@/components/ui/button'
import { Repeat } from 'lucide-react'
import { useMediaLoop } from '@/hooks/use-media-player'

export function MediaLoop() {
  const { isIdle, isLoop, handleToggleLoop } = useMediaLoop()

  return (
    <Button
      size="icon"
      variant={isLoop ? 'default' : 'ghost'}
      onClick={handleToggleLoop}
      disabled={isIdle}
    >
      <Repeat />
    </Button>
  )
}

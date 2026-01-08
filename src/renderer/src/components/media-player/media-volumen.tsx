import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Volume2, VolumeOff } from 'lucide-react'
import { useMediaStore } from '@/stores/media-store'

export function MediaVolmen() {
  const mediaRef = useMediaStore((state) => state.ref)
  const volumen = useMediaStore((state) => state.volumen)
  const isMuted = useMediaStore((state) => state.volumen === 0)
  const setVolumen = useMediaStore((state) => state.setVolumen)

  const handleChangeVolumen = (value: number[]) => {
    if (!mediaRef) return
    const newVolumen = value[0] / 100
    setVolumen(value[0])
    mediaRef.volume = newVolumen
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          {isMuted ? <VolumeOff /> : <Volume2 />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-10 h-70 bg-background/50 backdrop-blur-lg">
        <Slider
          value={[volumen]}
          onValueChange={handleChangeVolumen}
          max={100}
          min={0}
          step={1}
          orientation="vertical"
          className="h-full"
        />
      </PopoverContent>
    </Popover>
  )
}

import { Slider } from '@/components/ui/slider'
import { useMediaProgressbar } from '@/hooks/use-media-player'

export function MediaProgressbar() {
  const { seekTime, duration, onValueChange, handleValueCommit, isDisabled } = useMediaProgressbar()

  return (
    <div className="w-full absolute top-0 inset-x-0">
      <Slider
        disabled={isDisabled}
        value={[seekTime]}
        onValueChange={onValueChange}
        onValueCommit={handleValueCommit}
        min={0}
        step={1}
        max={duration}
      />
    </div>
  )
}

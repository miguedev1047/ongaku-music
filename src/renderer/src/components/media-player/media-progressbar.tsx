import { useMediaStore } from '@/stores/media-store'
import { Slider } from '@/components/ui/slider'
import { useEffect, useState } from 'react'

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

function useMediaProgressbar() {
  const [seekTime, setSeekTime] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)

  const mediaRef = useMediaStore((state) => state.ref)
  const currentTime = useMediaStore((state) => state.currentTime)
  const duration = useMediaStore((state) => state.duration)

  const setCurrentTime = useMediaStore((state) => state.setCurrentTime)

  useEffect(() => {
    if (isSeeking) return
    setSeekTime(currentTime)
  }, [currentTime, isSeeking])

  const onValueChange = (value: number[]) => {
    if (!mediaRef) return
    mediaRef.muted = true
    setIsSeeking(true)
    setSeekTime(value[0])
  }

  const handleValueCommit = (value: number[]) => {
    if (!mediaRef) return
    mediaRef.currentTime = value[0]
    setCurrentTime(value[0])
    setIsSeeking(false)
    mediaRef.muted = false
  }

  return {
    seekTime,
    duration,
    onValueChange,
    handleValueCommit,
    isDisabled: !mediaRef
  }
}

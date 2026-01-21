import type { FinalColor } from 'extract-colors/lib/types/Color'

import { useMediaStore } from '@/stores/media-store'
import { CoverImage } from '@/components/shared/cover-image'
import { AudioVisualizer } from '@/components/audio-visualizer'
import { useEffect, useState } from 'react'
import { extractColors } from 'extract-colors'

export function SongInfo() {
  const [color, setColor] = useState<FinalColor | null>(null)
  const currentSong = useMediaStore((state) => state.currentSong)

  useEffect(() => {
    if (!currentSong?.picture) return

    extractColors(currentSong.picture).then((colors) => {
      setColor(colors[0])
    })
  }, [currentSong])

  if (!currentSong) return null

  return (
    <div
      style={{ background: `rgb(${color?.red}, ${color?.green}, ${color?.blue}, 0.10)` }}
      className="w-full h-full p-4 flex flex-col justify-between relative transition-colors ease-in-out duration-300"
    >
      <div className="space-y-3">
        <h2 className="uppercase text-lg font-semibold">{currentSong.playlist}</h2>
        <figure className="aspect-square overflow-hidden rounded-lg relative">
          <CoverImage
            src={currentSong.picture}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </figure>
        <div>
          <h2 className="text-xl text-balance font-semibold mt-2 line-clamp-1">
            {currentSong.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {currentSong.metadata?.artist}
          </p>
        </div>
      </div>

      <AudioVisualizer />
    </div>
  )
}

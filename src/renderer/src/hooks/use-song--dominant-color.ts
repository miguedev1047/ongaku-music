import type { FinalColor } from 'extract-colors/lib/types/Color'
import { extractColors } from 'extract-colors'
import { useEffect, useState } from 'react'

export function useSongDominantColor(picture?: string | null) {
  const [color, setColor] = useState<FinalColor | null>(null)

  useEffect(() => {
    if (!picture) {
      queueMicrotask(() => setColor(null))
      return
    }

    let cancelled = false

    extractColors(picture).then((colors) => {
      if (cancelled) return
      setColor(colors[0] ?? null)
    })

    return () => {
      cancelled = true
    }
  }, [picture])

  return color
}

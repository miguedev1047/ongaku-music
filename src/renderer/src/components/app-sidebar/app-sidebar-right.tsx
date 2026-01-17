import Marquee from 'react-fast-marquee'

import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { useMediaStore } from '@/stores/media-store'
import { cn } from '@/lib/utils'
import { useSongDominantColor } from '@/hooks/use-song--dominant-color'
import { CoverImage } from '@/components/shared/cover-image'
import { AudioVisualizer } from '@/components/audio-visualizer'

export function AppSidebarRight() {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  const currentSong = useMediaStore((state) => state.currentSong)
  const color = useSongDominantColor(currentSong?.picture)

  if (isIdle) return

  return (
    <Sidebar
      data-idle={isIdle}
      collapsible="none"
      side="right"
      className={cn(
        'transition-colors duration-200',
        'sticky top-0 hidden border-l lg:flex',
        'data-[idle=false]:h-[calc(100svh-var(--footer-height)-3.5rem)] data-[idle=true]:h-[calc(100%-3.5rem)]'
      )}
      style={{
        background: color ? `rgb(${color.red}, ${color.green}, ${color.blue}, 0.1)` : undefined
      }}
    >
      <SidebarContent>
        <SongInfo />
      </SidebarContent>
    </Sidebar>
  )
}

export function SongInfo() {
  const currentSong = useMediaStore((state) => state.currentSong)

  if (!currentSong) return null

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between relative">
      <div className="space-y-3">
        <h2 className="uppercase text-lg font-semibold">{currentSong.playlist}</h2>
        <figure className="aspect-square overflow-hidden rounded-lg">
          <CoverImage
            src={currentSong.picture}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </figure>
        <div>
          <Marquee className="text-xl text-balance font-semibold mt-2 line-clamp-1">
            {currentSong.title}
          </Marquee>
          <Marquee className="text-sm text-muted-foreground line-clamp-1">
            {currentSong.metadata?.artist}
          </Marquee>
        </div>
      </div>

      <AudioVisualizer />
    </div>
  )
}

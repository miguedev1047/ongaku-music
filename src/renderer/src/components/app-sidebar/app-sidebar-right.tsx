import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { useMediaStore } from '@/stores/media-store'
import { DEFAULT_URL_IMG } from '@/constants/general'
import { ScrollingWaveform } from '@/components/ui/waveform'
import { cn } from '@/lib/utils'
import { useSongDominantColor } from '@/hooks/use-song--dominant-color'

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
        'data-[idle=false]:h-[calc(100vh-var(--footer-height))] data-[idle=true]:h-svh'
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
    <div className="w-full h-full p-4 flex flex-col justify-between">
      <div className="space-y-3">
        <h2 className="uppercase text-lg font-semibold">{currentSong.playlist}</h2>
        <figure className="aspect-square">
          <img
            src={currentSong.picture || DEFAULT_URL_IMG}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </figure>
        <div>
          <h2 className="text-xl text-balance font-semibold mt-2 line-clamp-1">
            {currentSong.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-1">{currentSong.artist}</p>
        </div>
      </div>

      <ScrollingWaveform
        height={60}
        barWidth={3}
        barGap={2}
        speed={30}
        fadeEdges={true}
        barColor="gray"
      />
    </div>
  )
}

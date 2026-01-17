import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { useMediaStore } from '@/stores/media-store'
import { cn } from '@/lib/utils'
import { CoverImage } from '@/components/shared/cover-image'
import { AudioVisualizer } from '@/components/audio-visualizer'

export function AppSidebarRight() {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  if (isIdle) return

  return (
    <Sidebar
      data-idle={isIdle}
      variant="inset"
      side="right"
      className={cn(
        'sticky top-0 hidden lg:flex',
        'data-[idle=false]:h-[calc(100svh-var(--footer-height)-3.5rem)] data-[idle=true]:h-[calc(100%-3.5rem)]'
      )}
    >
      <SidebarContent className="bg-background rounded-lg">
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

import { playlistSongsQueryOpts } from '@/queries/playlists-queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLoaderData } from '@tanstack/react-router'
import { VList } from 'virtua'
import { SongItem } from './song-item'
import { useMediaStore } from '@/stores/media-store'
import { cn } from '@/lib/utils'

export function SongList() {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  const { title } = useLoaderData({ from: '/_indexLayout/playlist/$title' })
  const { data } = useSuspenseQuery(playlistSongsQueryOpts(title))

  return (
    <div
      data-idle={isIdle}
      className={cn(
        'w-full min-h-0',
        'data-[idle=false]:h-[calc(100%-var(--footer-height)-2.5rem)] data-[idle=true]:h-full'
      )}
    >
      <VList className="space-y-2! no-scrollbar" data={data}>
        {(item) => <SongItem {...item} />}
      </VList>
    </div>
  )
}

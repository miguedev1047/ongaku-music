import { useSuspenseQuery } from '@tanstack/react-query'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { PlaylistItem } from '@/components/playlists/_index'
import { VList } from 'virtua'

export function PlaylistList() {
  const { data } = useSuspenseQuery(playlistQueryOpts)

  return (
    <VList className="h-full w-full space-y-2 no-scrollbar" data={data}>
      {(item) => <PlaylistItem key={item.title} {...item} />}
    </VList>
  )
}

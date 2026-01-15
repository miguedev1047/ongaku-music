import { useSuspenseQuery } from '@tanstack/react-query'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { PlaylistItem, PlaylistListEmpty } from '@/components/playlists/_index'
import { VList } from 'virtua'

export function PlaylistList() {
  const { data: playlists } = useSuspenseQuery(playlistQueryOpts)

  const emptyPlaylists = playlists.length === 0

  if (emptyPlaylists) {
    return <PlaylistListEmpty />
  }

  return (
    <VList className="h-full w-full space-y-2 no-scrollbar" data={playlists}>
      {(item) => <PlaylistItem key={item.title} {...item} />}
    </VList>
  )
}

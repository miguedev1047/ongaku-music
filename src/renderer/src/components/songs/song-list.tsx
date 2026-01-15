import { SongDialogContainer } from '@/components/dialogs/song/_index'
import { playlistSongsQueryOpts } from '@/queries/playlists-queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLoaderData } from '@tanstack/react-router'
import { VList } from 'virtua'
import { SongListEmpty, SongItem } from '@/components/songs/_index'

export function SongList() {
  const { title } = useLoaderData({ from: '/_indexLayout/playlist/$title' })
  const { data: songs } = useSuspenseQuery(playlistSongsQueryOpts(title))

  const emptySongs = songs.length === 0

  if (emptySongs) {
    return <SongListEmpty />
  }

  return (
    <SongDialogContainer>
      <div className="w-full min-h-0 h-full">
        <VList className="space-y-2! no-scrollbar" data={songs}>
          {(item) => <SongItem key={item.id} {...item} />}
        </VList>
      </div>
    </SongDialogContainer>
  )
}

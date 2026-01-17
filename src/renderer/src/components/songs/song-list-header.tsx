import { playlistSongsQueryOpts } from '@/queries/playlists-queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

export function SongListHeader() {
  const { title } = useParams({ from: '/_indexLayout/playlist/$title' })
  const { data: songs } = useSuspenseQuery(playlistSongsQueryOpts(title))

  return (
    <header className="flex items-center gap-3 text-xl font-bold uppercase">
      <h2>{title}</h2>
      <span> - </span>
      <p>{songs.length}</p>
    </header>
  )
}

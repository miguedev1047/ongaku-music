import { useSearchStore } from '@/stores/search-store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { useNavigate } from '@tanstack/react-router'
import { SearchDialog, SearchDialogItem } from '@/components/ui/search-dialog'
import { PlaylistModel } from '@shared/models'

export function SearchPlaylist() {
  const playlistsModalOpen = useSearchStore((state) => state.playlistsModalOpen)
  const togglePlaylistModal = useSearchStore((state) => state.togglePlaylistModal)

  const { data } = useSuspenseQuery(playlistQueryOpts)

  const navigate = useNavigate()

  const handleOnSelect = (playlist: PlaylistModel) => {
    navigate({ to: '/playlist/$title', params: { title: playlist.title } })
    togglePlaylistModal()
  }

  return (
    <SearchDialog
      open={playlistsModalOpen}
      onOpenChange={togglePlaylistModal}
      title="Search playlist..."
      description="Search a playlist folder"
      heading="Playlists - Songs  "
      placeholder="Type a playlist name..."
      items={data}
      getKey={(p) => p.title}
      onSelect={handleOnSelect}
      renderItem={(playlist, onSelect) => (
        <SearchDialogItem key={playlist.title} onSelect={onSelect} className="flex justify-between">
          <span>{playlist.title}</span>
          <span className="text-muted-foreground">{playlist.totalSongs}</span>
        </SearchDialogItem>
      )}
    />
  )
}

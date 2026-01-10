import { useMediaStore } from '@/stores/media-store'
import { useRecentSongsStore } from '@/stores/recent-songs-store'
import { useSearchStore } from '@/stores/search-store'
import { PlaylistModel, SongModel } from '@shared/models'
import { useLocation, useNavigate } from '@tanstack/react-router'

export function useSearchPlaylist() {
  const playlistsModalOpen = useSearchStore((state) => state.playlistsModalOpen)
  const togglePlaylistModal = useSearchStore((state) => state.togglePlaylistModal)

  const navigate = useNavigate()

  const handleOnSelect = (playlist: PlaylistModel) => {
    navigate({ to: '/playlist/$title', params: { title: playlist.title } })
    togglePlaylistModal()
  }

  return { playlistsModalOpen, togglePlaylistModal, handleOnSelect }
}

export function useSearchSong() {
  const playlist = useMediaStore((state) => state.playlist)
  const setSong = useMediaStore((state) => state.setSong)
  const songsModalOpen = useSearchStore((state) => state.songsModalOpen)
  const toggleSongModal = useSearchStore((state) => state.toggleSongModal)
  const setPlaylist = useMediaStore((state) => state.setPlaylist)
  const pushRecentSong = useRecentSongsStore((state) => state.pushRecentSong)

  const { pathname } = useLocation()
  const currentPlaylist = pathname.split('/')[2] || playlist

  const handleOnSelect = (song: SongModel) => {
    toggleSongModal()
    setSong(song)
    pushRecentSong(song)
    setPlaylist(song.playlist)
  }

  return {
    playlist,
    currentPlaylist,
    toggleSongModal,
    songsModalOpen,
    handleOnSelect
  }
}

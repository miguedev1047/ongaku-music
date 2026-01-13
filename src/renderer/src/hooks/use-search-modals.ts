import { useDialogStore } from '@/stores/dialog-action-store'
import { useMediaStore } from '@/stores/media-store'
import { useRecentSongsStore } from '@/stores/recent-songs-store'
import { PlaylistModel, SongModel } from '@shared/models'
import { useLocation, useNavigate } from '@tanstack/react-router'

export function useSearchPlaylist() {
  const isOpen = useDialogStore(
    (state) =>
      state.dialog.key === 'playlist' && state.dialog.action === 'search' && state.dialog.isOpen
  )
  const open = useDialogStore((state) => state.open)
  const close = useDialogStore((state) => state.close)

  const navigate = useNavigate()

  const handleOnSelect = (playlist: PlaylistModel) => {
    navigate({ to: '/playlist/$title', params: { title: playlist.title } })
    close()
  }

  const handleToggle = () => {
    isOpen ? close() : open('playlist', 'search', null)
  }

  return { isOpen, handleToggle, handleOnSelect }
}

export function useSearchSong() {
  const isOpen = useDialogStore(
    (state) =>
      state.dialog.key === 'song' && state.dialog.action === 'search' && state.dialog.isOpen
  )
  const open = useDialogStore((state) => state.open)
  const close = useDialogStore((state) => state.close)

  const playlist = useMediaStore((state) => state.playlist)
  const setSong = useMediaStore((state) => state.setSong)
  const setPlaylist = useMediaStore((state) => state.setPlaylist)
  const pushRecentSong = useRecentSongsStore((state) => state.pushRecentSong)

  const { pathname } = useLocation()
  const currentPlaylist = pathname.split('/')[2] || playlist

  const handleOnSelect = (song: SongModel) => {
    setSong(song)
    pushRecentSong(song)
    setPlaylist(song.playlist)
    close()
  }

  const handleToggle = () => {
    isOpen ? close() : open('song', 'search', null)
  }

  return {
    playlist,
    currentPlaylist,
    handleToggle,
    isOpen,
    handleOnSelect
  }
}

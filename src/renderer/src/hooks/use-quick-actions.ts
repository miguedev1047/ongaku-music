import { useNavigate } from '@tanstack/react-router'
import { useSearchPlaylist, useSearchSong } from './use-search-modals'
import { DownloadCloudIcon, ListMusic, MusicIcon } from 'lucide-react'

export function useQuickActions() {
  const { toggleSongModal } = useSearchSong()
  const { togglePlaylistModal } = useSearchPlaylist()

  const navigate = useNavigate()

  const quickActions = [
    {
      title: 'Search playlists',
      icon: ListMusic,
      onAction: () => togglePlaylistModal()
    },
    {
      title: 'Search songs',
      icon: MusicIcon,
      onAction: () => toggleSongModal()
    },
    {
      title: 'Downloads',
      icon: DownloadCloudIcon,
      onAction: () => navigate({ to: '/download' })
    }
  ]

  return { quickActions }
}

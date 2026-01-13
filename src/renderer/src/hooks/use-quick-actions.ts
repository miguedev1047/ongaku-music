import { useNavigate } from '@tanstack/react-router'
import { DownloadCloudIcon, ListMusic, MusicIcon } from 'lucide-react'
import { useDialogStore } from '@/stores/dialog-action-store'

export function useQuickActions() {
  const open = useDialogStore((state) => state.open)

  const navigate = useNavigate()

  const quickActions = [
    {
      title: 'Playlists',
      icon: ListMusic,
      onAction: () => open('playlist', 'search', null)
    },
    {
      title: 'Songs',
      icon: MusicIcon,
      onAction: () => open('song', 'search', null)
    },
    {
      title: 'Downloads',
      icon: DownloadCloudIcon,
      onAction: () => navigate({ to: '/download' })
    }
  ]

  return { quickActions }
}

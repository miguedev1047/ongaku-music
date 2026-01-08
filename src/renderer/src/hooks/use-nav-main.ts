import { useDialogActionStore } from '@/stores/dialog-action-store'
import { useSearchStore } from '@/stores/search-store'
import { useNavigate } from '@tanstack/react-router'
import { Download, Home, Plus, Search } from 'lucide-react'

export function useNavMain() {
  const togglePlaylistModal = useSearchStore((state) => state.togglePlaylistModal)
  const openDialog = useDialogActionStore((state) => state.openDialog)

  const navigate = useNavigate()

  const NAV_MAIN_ROUTES = [
    {
      title: 'New playlist',
      onAction: () => openDialog('new'),
      icon: Plus
    },
    {
      title: 'Search playlist',
      onAction: () => togglePlaylistModal(),
      icon: Search
    },
    {
      title: 'Home',
      onAction: () => navigate({ to: '/' }),
      icon: Home
    },
    {
      title: 'Download',
      onAction: () => navigate({ to: '/download' }),
      icon: Download
    }
  ]

  return { NAV_MAIN_ROUTES }
}

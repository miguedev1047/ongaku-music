import { useDialogStore } from '@/stores/dialog-action-store'
import { useNavigate } from '@tanstack/react-router'
import { Download, Home, Plus, Search } from 'lucide-react'

export function useNavMain() {
  const open = useDialogStore((state) => state.open)
  const navigate = useNavigate()

  const navMainRoutes = [
    {
      title: 'New playlist',
      onAction: () => open('playlist', 'new', null),
      icon: Plus
    },
    {
      title: 'Search playlist',
      onAction: () => open('playlist', 'search', null),
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

  return { navMainRoutes }
}

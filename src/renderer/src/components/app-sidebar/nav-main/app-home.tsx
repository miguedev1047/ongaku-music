import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'

export function AppHome() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to="/" preload="intent" activeProps={{ className: 'bg-sidebar-accent' }}>
          <Home />
          Home
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

import { useNavMain } from '@/hooks/use-nav-main'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { MusicIcon } from 'lucide-react'
import { SearchPlaylist } from '@/components/searchs/_index'
import { Link } from '@tanstack/react-router'

export function NavMain() {
  const { NAV_MAIN_ROUTES } = useNavMain()

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size="lg" className="pb-3">
          <Link to="/">
            <MusicIcon />
            Ongaku Music
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {NAV_MAIN_ROUTES.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton onClick={item.onAction}>
            <item.icon />
            {item.title}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <SearchPlaylist />
    </>
  )
}

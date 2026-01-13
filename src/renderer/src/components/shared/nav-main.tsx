import { useNavMain } from '@/hooks/use-nav-main'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { SearchPlaylist } from '@/components/searchs/_index'

export function NavMain() {
  const { navMainRoutes } = useNavMain()

  return (
    <>
      {navMainRoutes.map((item) => (
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

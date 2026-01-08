import { SidebarMenuSkeleton } from '../ui/sidebar'

export function PlaylistSkeleton() {
  const ITEMS = [...Array(9)]

  const RENDER_SKELETONS = ITEMS.map((_, index) => <SidebarMenuSkeleton key={index} />)

  return RENDER_SKELETONS
}

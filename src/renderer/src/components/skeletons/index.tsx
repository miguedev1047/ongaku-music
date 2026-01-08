import { SidebarMenuSkeleton } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

export function DownloadFormSkeleton() {
  return <Skeleton className="w-full h-95" />
}

export function NavMainSkeleton() {
  const ITEMS = [...Array(4)]
  const RENDER_SKELETONS = ITEMS.map((_, index) => <SidebarMenuSkeleton key={index} />)
  return RENDER_SKELETONS
}

export function SearchSongSkeleton() {
  return <Skeleton className="max-w-80 w-full h-8" />
}

export function MediaPlayerButtonSkeleton() {
  return <Skeleton className="size-8" />
}

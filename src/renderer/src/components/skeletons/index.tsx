import { SidebarMenuSkeleton } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionContainer } from '../shared/section-container'

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

export function PlaylistRouteSkeleton() {
  const ITEMS = [...Array(5)]
  const RENDER_SKELETONS = ITEMS.map((_, index) => (
    <Skeleton key={index} className="rounded-lg h-20 w-full" />
  ))

  return (
    <SectionContainer>
      <div className="flex gap-3 items-center">
        <Skeleton className="w-32 h-5" />
        <Skeleton className="w-12 h-5" />
      </div>

      <ul className="space-y-2">{RENDER_SKELETONS}</ul>
    </SectionContainer>
  )
}

export function SongListSkeleton() {
  const ITEMS = [...Array(5)]
  const RENDER_SKELETONS = ITEMS.map((_, index) => (
    <Skeleton key={index} className="rounded-lg h-20 w-full" />
  ))
  return <ul className="space-y-2">{RENDER_SKELETONS}</ul>
}

export function SongListHeaderSkeleton() {
  return (
    <div className="flex gap-3 items-center">
      <Skeleton className="w-32 h-5" />
      <Skeleton className="w-12 h-5" />
    </div>
  )
}

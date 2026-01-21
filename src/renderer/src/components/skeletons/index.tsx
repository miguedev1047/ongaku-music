import { SidebarMenuSkeleton } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionContainer } from '../shared/section-container'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '../ui/item'
import { Spinner } from '../ui/spinner'

export function DownloadFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-40 h-4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-100 h-3" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-80 h-4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-80 h-4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-80 h-4" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="w-40 h-8" />
      </CardFooter>
    </Card>
  )
}

export function DownloadAlertSkeleton() {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <Spinner />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Checking dependencies...</ItemTitle>
        <ItemDescription>Please wait while we check your system.</ItemDescription>
      </ItemContent>
    </Item>
  )
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

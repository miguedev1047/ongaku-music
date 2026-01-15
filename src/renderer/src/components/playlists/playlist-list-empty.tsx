import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { ListMusic } from 'lucide-react'

export function PlaylistListEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListMusic />
        </EmptyMedia>
        <EmptyTitle>No playlists found</EmptyTitle>
        <EmptyDescription>Try adding some playlists</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

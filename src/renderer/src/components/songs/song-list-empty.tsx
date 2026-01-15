import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { ListMusic } from 'lucide-react'

export function SongListEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListMusic />
        </EmptyMedia>
        <EmptyTitle>No songs found</EmptyTitle>
        <EmptyDescription>Try adding some songs to your playlist</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

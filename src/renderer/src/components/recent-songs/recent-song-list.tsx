import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import { useRecentSongsStore } from '@/stores/recent-songs-store'
import { RecentSongItem } from '@/components/recent-songs/_index'
import { ListMusic } from 'lucide-react'

export function RecentSongsList() {
  const recentSongs = useRecentSongsStore((state) => state.songs)

  if (!recentSongs.length) {
    return (
      <Empty className="py-12 border border-dashed">
        <EmptyContent>
          <EmptyHeader>
            <EmptyMedia>
              <ListMusic className="h-8 w-8" />
            </EmptyMedia>
            <EmptyTitle className="text-xl font-semibold">
              You haven&#39;t heard anything yet.
            </EmptyTitle>
            <EmptyDescription className="text-base text-muted-foreground max-w-md">
              Your recently played songs will appear here so you can easily access them.
            </EmptyDescription>
          </EmptyHeader>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <ul className="grid grid-cols-2 @sm/main:grid-cols-3 @md/main:grid-cols-5 gap-4">
      {recentSongs.map((item, index) => (
        <RecentSongItem index={index} song={item} key={item.filename} />
      ))}
    </ul>
  )
}

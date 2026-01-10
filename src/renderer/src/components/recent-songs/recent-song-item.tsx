import Marquee from 'react-fast-marquee'
import { Play } from 'lucide-react'

import type { SongModel } from '@shared/models'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useMediaStore } from '@/stores/media-store'
import { useRecentSongsStore } from '@/stores/recent-songs-store'
import { CoverImage } from '@/components/shared/cover-image'

interface RecentSongItemProps {
  index: number
  song: SongModel
}

export function RecentSongItem({ index, song }: RecentSongItemProps) {
  const { title, picture, artist, playlist } = song

  const isActive = useMediaStore((state) => state.songTitle() === title)
  const setSong = useMediaStore((state) => state.setSong)
  const setPlaylist = useMediaStore((state) => state.setPlaylist)
  const pushRecentSong = useRecentSongsStore((state) => state.pushRecentSong)

  const handlePlaySong = () => {
    setSong(song)
    setPlaylist(playlist)
    pushRecentSong(song)
  }

  return (
    <li role="button" onClick={handlePlaySong} className="cursor-pointer space-y-2">
      <figure
        className={cn(
          'group relative aspect-square overflow-hidden rounded-lg bg-card transition',
          isActive && 'ring-2 ring-primary'
        )}
      >
        <CoverImage
          src={picture}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition-transform group-hover:scale-105"
        />

        {index === 0 && (
          <Badge variant="secondary" className="absolute left-2 top-2 text-[10px]">
            Last played
          </Badge>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </figure>

      <div className="space-y-0.5">
        <Marquee className="text-sm font-semibold">{title}</Marquee>
        <p className="truncate text-xs text-muted-foreground">{artist || 'Unknown artist'}</p>
      </div>
    </li>
  )
}

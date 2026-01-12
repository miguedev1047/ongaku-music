import { SongModel } from '@shared/models'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { formatTime } from '@/helpers/format-time'
import { useMediaStore } from '@/stores/media-store'
import { useRecentSongsStore } from '@/stores/recent-songs-store'
import { DEFAULT_URL_IMG } from '@shared/constants'

export function SongItem(props: SongModel) {
  const { title, picture, metadata } = props
  const isActive = useMediaStore((state) => state.songTitle() === title)
  const setSong = useMediaStore((state) => state.setSong)
  const setPlaylist = useMediaStore((state) => state.setPlaylist)
  const pushRecentSong = useRecentSongsStore((state) => state.pushRecentSong)

  const handlePlaySong = () => {
    setSong(props)
    pushRecentSong(props)
    setPlaylist(props.playlist)
  }

  return (
    <Item
      data-active={isActive}
      className="relative bg-card mb-1.5 cursor-pointer data-[active=true]:bg-accent hover:bg-accent/80 transition-colors"
      onClick={handlePlaySong}
      role="button"
    >
      <ItemMedia variant="image-sm">
        <img
          src={picture || DEFAULT_URL_IMG}
          alt={title}
          width={64}
          height={64}
          loading="lazy"
          className="size-full object-cover"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">
          {title} - <span className="text-muted-foreground">{metadata?.album}</span>
        </ItemTitle>
        <ItemDescription className="line-clamp-1">{metadata?.artist}</ItemDescription>
      </ItemContent>
      <ItemContent className="flex-none text-center">
        <ItemDescription>{formatTime(metadata?.duration || 0)}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

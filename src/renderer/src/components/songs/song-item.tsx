import { SongModel } from '@shared/models'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { formatTime } from '@/helpers/format-time'
import { DEFAULT_URL_IMG } from '@/constants/general'
import { useMediaStore } from '@/stores/media-store'

export function SongItem(props: SongModel) {
  const { title, picture, album, artist, duration } = props

  const isActive = useMediaStore((state) => state.songTitle() === title)

  const setSong = useMediaStore((state) => state.setSong)
  const setPlaylist = useMediaStore((state) => state.setPlaylist)

  const handlePlaySong = () => {
    setSong(props)
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
          {title} - <span className="text-muted-foreground">{album}</span>
        </ItemTitle>
        <ItemDescription className="line-clamp-1">{artist}</ItemDescription>
      </ItemContent>
      <ItemContent className="flex-none text-center">
        <ItemDescription>{formatTime(duration)}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

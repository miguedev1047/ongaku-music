import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { SongModel } from '@shared/models'
import { formatTime } from '@/helpers/format-time'
import { useMediaStore } from '@/stores/media-store'
import { useRecentSongsStore } from '@/stores/recent-songs-store'
import { SongItemContextMenu } from '@/components/songs/_index'
import { CoverImage } from '@/components/shared/cover-image'
import { memo } from 'react'

function SongItemMemoized(props: SongModel) {
  const { title, picture, metadata } = props

  const isActive = useMediaStore((state) => state.songTitle() === title)
  const setSong = useMediaStore((state) => state.setSong)
  const setPlaylist = useMediaStore((state) => state.setPlaylist)
  const pushRecentSong = useRecentSongsStore((state) => state.pushRecentSong)
  const setPlay = useMediaStore((state) => state.setPlay)

  const handlePlaySong = async () => {
    setSong(props)
    pushRecentSong(props)
    setPlaylist(props.playlist)
    setPlay(true)
  }

  return (
    <SongItemContextMenu song={props}>
      <Item
        data-active={isActive}
        className="relative mb-1.5 cursor-pointer data-[active=true]:bg-accent hover:bg-accent/80 transition-colors group/title"
        onClick={handlePlaySong}
        role="button"
      >
        <ItemMedia variant="image-sm">
          <CoverImage src={picture} alt={title} loading="lazy" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">
            <span
              data-active={isActive}
              className="data-[active=true]:text-primary group-hover/title:text-primary  transition-colors"
            >
              {title}
            </span>{' '}
            - <span className="text-muted-foreground">{metadata?.album}</span>
          </ItemTitle>
          <ItemDescription className="line-clamp-1">{metadata?.artist}</ItemDescription>
        </ItemContent>
        <ItemContent className="flex-none text-center">
          <ItemDescription>{formatTime(metadata?.duration || 0)}</ItemDescription>
        </ItemContent>
      </Item>
    </SongItemContextMenu>
  )
}

export const SongItem = memo(SongItemMemoized)

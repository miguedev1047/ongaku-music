import { DEFAULT_URL_IMG } from '@/constants/general'
import { ItemMedia, Item, ItemContent, ItemTitle, ItemDescription } from '@/components/ui/item'
import { useMediaStore } from '@/stores/media-store'
import { CoverImage } from '@/components/shared/cover-image'

export function MediaSongInfo() {
  const mediaSongInfo = useMediaStore((state) => state.currentSong)

  if (!mediaSongInfo) return

  return (
    <div className="flex flex-1 grow basis-0">
      <Item className="px-0">
        <ItemMedia variant="image">
          <CoverImage src={mediaSongInfo.picture || DEFAULT_URL_IMG} alt={mediaSongInfo.title} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{mediaSongInfo.title}</ItemTitle>
          <ItemDescription className="line-clamp-1">{mediaSongInfo.artist}</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}

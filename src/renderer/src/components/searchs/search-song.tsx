import { useSuspenseQuery } from '@tanstack/react-query'
import { playlistSongsQueryOpts } from '@/queries/playlists-queries'
import { SearchDialog, SearchDialogItem } from '@/components/ui/search-dialog'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { useSearchSong } from '@/hooks/use-search-modals'
import { CoverImage } from '@/components/shared/cover-image'

export function SearchSong() {
  const { isOpen, handleToggle, currentPlaylist, handleOnSelect } = useSearchSong()
  const { data } = useSuspenseQuery(playlistSongsQueryOpts(currentPlaylist))
  useKeyboardShortcut({ combo: { code: 'KeyK', ctrl: true }, handler: handleToggle })

  return (
    <>
      <Button
        className="flex justify-between items-center max-w-80 w-full!"
        variant="outline"
        size="sm"
        onClick={handleToggle}
      >
        <span>Search songs...</span>
        <Kbd>Ctrl + K</Kbd>
      </Button>
      <SearchDialog
        open={isOpen}
        onOpenChange={handleToggle}
        title="Search songs..."
        description="Search a song to play"
        heading={`All songs - ${currentPlaylist}`}
        placeholder="Type a song name..."
        items={data}
        getKey={(s) => s.title}
        onSelect={handleOnSelect}
        renderItem={(song, onSelect) => (
          <SearchDialogItem key={song.title} onSelect={onSelect} className="p-0! h-12">
            <Item className="p-1!">
              <ItemMedia variant="image-sm">
                <CoverImage
                  src={song.picture}
                  alt={song.title}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">{song.title}</ItemTitle>
              </ItemContent>
            </Item>
          </SearchDialogItem>
        )}
      />
    </>
  )
}

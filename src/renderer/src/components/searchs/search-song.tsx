import { useSuspenseQuery } from '@tanstack/react-query'
import { playlistSongsQueryOpts } from '@/queries/playlists-queries'
import { SearchDialog, SearchDialogItem } from '@/components/ui/search-dialog'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item'
import { DEFAULT_URL_IMG } from '@/constants/general'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { useSearchSong } from '@/hooks/use-search-modals'

export function SearchSong() {
  const { songsModalOpen, currentPlaylist, toggleSongModal, handleOnSelect } = useSearchSong()

  const { data } = useSuspenseQuery(playlistSongsQueryOpts(currentPlaylist))

  useKeyboardShortcut({ combo: { code: 'KeyK', ctrl: true }, handler: toggleSongModal })

  return (
    <>
      <Button
        className="flex justify-between items-center max-w-80 w-full!"
        variant="outline"
        size="sm"
        onClick={toggleSongModal}
      >
        <span>Search songs...</span>
        <Kbd>Ctrl + K</Kbd>
      </Button>
      <SearchDialog
        open={songsModalOpen}
        onOpenChange={toggleSongModal}
        title="Search songs..."
        description="Search a song to play"
        heading="All songs"
        placeholder="Type a song name..."
        items={data}
        getKey={(s) => s.title}
        onSelect={handleOnSelect}
        renderItem={(song, onSelect) => (
          <SearchDialogItem key={song.title} onSelect={onSelect} className="p-0! h-12">
            <Item className="p-1!">
              <ItemMedia variant="image-sm">
                <img
                  src={song.picture || DEFAULT_URL_IMG}
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

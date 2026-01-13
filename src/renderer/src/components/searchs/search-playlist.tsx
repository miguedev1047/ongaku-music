import { useSuspenseQuery } from '@tanstack/react-query'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { SearchDialog, SearchDialogItem } from '@/components/ui/search-dialog'
import { useSearchPlaylist } from '@/hooks/use-search-modals'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'

export function SearchPlaylist() {
  const { isOpen, handleToggle, handleOnSelect } = useSearchPlaylist()
  const { data } = useSuspenseQuery(playlistQueryOpts)
  useKeyboardShortcut({ combo: { code: 'KeyP', ctrl: true }, handler: handleToggle })

  return (
    <SearchDialog
      open={isOpen}
      onOpenChange={handleToggle}
      title="Search playlist..."
      description="Search a playlist folder"
      heading="Playlists - Songs"
      placeholder="Type a playlist name..."
      items={data}
      getKey={(p) => p.title}
      onSelect={handleOnSelect}
      renderItem={(playlist, onSelect) => (
        <SearchDialogItem key={playlist.title} onSelect={onSelect} className="flex justify-between">
          <span>{playlist.title}</span>
          <span className="text-muted-foreground">{playlist.totalSongs}</span>
        </SearchDialogItem>
      )}
    />
  )
}

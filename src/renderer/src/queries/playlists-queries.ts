import type { PlaylistModel, SongModel } from '@shared/models'
import { queryOptions } from '@tanstack/react-query'

export const playlistQueryOpts = queryOptions<PlaylistModel[]>({
  queryKey: ['playlists'],
  queryFn: async () => await window.api.getPlaylists()
})

export const playlistSongsQueryOpts = (playlist: string) =>
  queryOptions<SongModel[]>({
    queryKey: ['playlist', playlist],
    queryFn: async () => await window.api.getSongsByPlaylist(playlist)
  })

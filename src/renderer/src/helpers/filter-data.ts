import { PlaylistModel, SongModel } from '@shared/models'

export const filterPlaylists = (playlists: PlaylistModel[], term: string): PlaylistModel[] => {
  if (!term.trim()) return playlists

  const lowerTerm = term.toLowerCase()
  return playlists.filter((playlist) => playlist.title.toLowerCase().includes(lowerTerm))
}

export const filterSongs = (songs: SongModel[], term: string): SongModel[] => {
  if (!term.trim()) return songs

  const lowerTerm = term.toLowerCase()
  return songs.filter((song) => song.title.toLowerCase().includes(lowerTerm))
}

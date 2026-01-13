import type {
  PlaylistModel,
  RemovePlaylistModel,
  SongModel,
  DownloadSongModel,
  WatchPlaylistModel,
  ResponseModel,
  MoveSongModel,
  RenameSongModel,
  RemoveSongModel
} from './models'

export type GetPlaylists = (filename: string) => Promise<PlaylistModel[]>
export type GetSongsByPlaylist = (playlist: string | undefined) => Promise<SongModel[]>
export type GetSong = (filename: string, playlist: string | undefined) => Promise<SongModel>

export type NewPlaylist = (playlistName: string) => Promise<ResponseModel>
export type RemovePlaylist = (playlistName: string) => Promise<ResponseModel>
export type RenamePlaylist = (props: RemovePlaylistModel) => Promise<ResponseModel>
export type OpenFolderPlaylist = (playlistName: string) => Promise<void>

export type MoveSong = (props: MoveSongModel) => Promise<ResponseModel>
export type RenameSong = (props: RenameSongModel) => Promise<ResponseModel>
export type RemoveSong = (props: RemoveSongModel) => Promise<ResponseModel>

export type DownloadSong = (props: DownloadSongModel) => Promise<ResponseModel>

export type WatchPlaylist = (props: WatchPlaylistModel) => Promise<void>

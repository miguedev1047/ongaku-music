import type { BrowserWindow } from 'electron'

export interface ResponseModel {
  message: string
  code: 'ERROR' | 'SUCCESS'
}

export interface SongListModel {
  name: string
  artist: string
  album: string
  duration: number
  extension: string
  path: string
  id: string
}

export interface PlaylistModel {
  title: string
  playlist: string
  totalSongs: number
  birthtime: Date
}

export interface SongModel {
  title: string
  filename: string
  src: string
  artist: string
  playlist: string
  album: string
  picture: string | null
  extension: string
  duration: number
  birthtime: Date
}

export interface RemovePlaylistModel {
  newName: string
  oldName: string
}

export interface GetSongImageModel {
  base64String: string
  format: string
  title: string
}

export interface SongListModel {
  name: string
  artist: string
  album: string
  duration: number
  path: string
  id: string
}

export interface GetSongsByPlaylistModel {
  title: string
  filename: string
  src: string
  picture: string | null
  artist: string
  extension: string
  album: string
  duration: number
  birthtime: Date
}

export interface GetPlayListPathModel {
  title: string
  playlist: string
  totalSongs: number
  birthtime: Date
}

export interface DownloadSongModel {
  playlistName: string
  songUrl: string
}

export interface WatchPlaylistModel {
  playlistName: string
}

export interface NotifyChangeModel {
  win: BrowserWindow
  playlistName: string
  changeType: string
}

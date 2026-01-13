import type { BrowserWindow } from 'electron'
import type { PlaylistInfo, VideoInfo, VideoProgress } from 'ytdlp-nodejs'

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
  id: string
  title: string
  path: string
  birthdate: string
  filename: string
  totalSongs: number
  isDirectory: boolean
}

export interface SongModel {
  id: string
  title: string
  path: string
  playlist: string
  fileName: string
  picture: string | null
  audioUrl: string
  extension: string
  metadata: SongMetadataModel | null
  birthtime: Date
}

export interface RemovePlaylistModel {
  newName: string
  oldName: string
}

export interface MoveSongModel {
  fileSource: string
  fileName: string
  playlistName: string
}

export interface RenameSongModel {
  oldName: string
  newName: string
  playlistName: string
}

export interface RemoveSongModel {
  playlistName: string
  songName: string
}

export interface GetSongImageModel {
  base64String: string
  format: string
  id: string
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
  id: string
  title: string
  path: string
  fileName: string
  playlist: string
  picture: string | null
  audioUrl: string
  extension: string
  metadata: SongMetadataModel | null
  birthtime: Date
}

export interface GetPlayListPathModel {
  id: string
  title: string
  path: string
  birthdate: string
  filename: string
  totalSongs: number
  isDirectory: boolean
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

export interface DownloadSongProgressModel {
  progress: VideoProgress
  info: VideoInfo | PlaylistInfo
}

export interface SongMetadataModel {
  artist: string
  album: string
  duration: number
}

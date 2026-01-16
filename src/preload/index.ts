import type { VideoProgress } from 'ytdlp-nodejs'
import type {
  GetPlaylists,
  GetSongsByPlaylist,
  GetSong,
  NewPlaylist,
  RemovePlaylist,
  RenamePlaylist,
  OpenFolderPlaylist,
  DownloadSong,
  MoveSong,
  RenameSong,
  RemoveSong
} from '../shared/types'

import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { DownloadSongProgressModel } from '../shared/models'

const api = {
  getPlaylists: (...args: Parameters<GetPlaylists>) => ipcRenderer.invoke('get-playlists', ...args),
  getSongsByPlaylist: (...args: Parameters<GetSongsByPlaylist>) =>
    ipcRenderer.invoke('get-songs-by-playlist', ...args),
  getSongByFilename: (...args: Parameters<GetSong>) =>
    ipcRenderer.invoke('get-song-by-filename', ...args),

  newPlaylist: (...args: Parameters<NewPlaylist>) => ipcRenderer.invoke('new-playlist', ...args),
  removePlaylist: (...args: Parameters<RemovePlaylist>) =>
    ipcRenderer.invoke('remove-playlist', ...args),
  renamePlaylist: (...args: Parameters<RenamePlaylist>) =>
    ipcRenderer.invoke('rename-playlist', ...args),
  openFolderPlaylist: (...args: Parameters<OpenFolderPlaylist>) =>
    ipcRenderer.invoke('open-folder-playlist', ...args),

  moveSong: (...args: Parameters<MoveSong>) => ipcRenderer.invoke('move-song', ...args),
  renameSong: (...args: Parameters<RenameSong>) => ipcRenderer.invoke('rename-song', ...args),
  removeSong: (...args: Parameters<RemoveSong>) => ipcRenderer.invoke('remove-song', ...args),

  downloadSong: (...args: Parameters<DownloadSong>) => ipcRenderer.invoke('download-song', ...args),
  onDownloadProgress: (callback: (progress: VideoProgress) => void) => {
    ipcRenderer.on('download-progress', (_, progress) => {
      callback(progress)
    })
  },
  onDownloadSongProgress: (callback: (data: DownloadSongProgressModel) => void) => {
    ipcRenderer.on('on-download-progress-song', (_, data) => {
      callback(data)
    })
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    console.log('Loaded preload!!')
  } catch (error) {
    console.error(error)
  }
}

import type { VideoProgress } from 'ytdlp-nodejs'
import type {
  GetPlaylists,
  GetSongsByPlaylist,
  GetSong,
  NewPlaylist,
  RemovePlaylist,
  RenamePlaylist,
  OpenFolderPlaylist,
  DownloadSong
} from '../shared/types'

import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

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

  downloadSong: (...args: Parameters<DownloadSong>) => ipcRenderer.invoke('download-song', ...args),
  onDownloadProgress: (callback: (progress: VideoProgress) => void) => {
    ipcRenderer.on('download-progress', (_, progress) => {
      callback(progress)
    })
  }

  // onPlaylistUpdated: (callback: (data: NotifyChangeModel) => void) => {
  //   ipcRenderer.on("playlist-updated", (_, data) => callback(data))
  // },
  // removePlaylistListener: () => {
  //   ipcRenderer.removeAllListeners("playlist-updated")
  // },
  // startWatchPlaylist: (...args: Parameters<WatchPlaylist>) =>
  //   ipcRenderer.send("start-watch-playlist", ...args)
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

import type {
  PlaylistModel,
  RemovePlaylistModel,
  SongModel,
  NotifyChangeModel,
  WatchPlaylistModel,
  DownloadSongModel,
  ResponseModel,
  DownloadSongProgressModel
} from '../shared/models'
import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getPlaylists: () => Promise<PlaylistModel[]>
      getSongsByPlaylist: (playlistName: string | undefined) => Promise<SongModel[]>
      getSongByFilename: (
        filename: string,
        playlistName: string | undefined
      ) => Promise<SongModel | null>
      newPlaylist: (playlistName: string) => Promise<ResponseModel>
      removePlaylist: (playlistName: string) => Promise<ResponseModel>
      renamePlaylist: (props: RemovePlaylistModel) => Promise<ResponseModel>
      openFolderPlaylist: (playlistName: string) => Promise<void>
      downloadSong: (props: DownloadSongModel) => Promise<ResponseModel>
      onDownloadSongProgress: (callback: (data: DownloadSongProgressModel) => void) => void
      onPlaylistUpdated: (callback: (props: NotifyChangeModel) => void) => void
      removePlaylistListener: () => void
      startWatchPlaylist: (props: WatchPlaylistModel) => void
    }
  }
}

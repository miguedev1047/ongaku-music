import type {
  PlaylistModel,
  RemovePlaylistModel,
  SongModel,
  DownloadSongModel,
  ResponseModel,
  DownloadSongProgressModel,
  MoveSongModel,
  RenameSongModel,
  RemoveSongModel,
  OnUpdatePlaylist,
  DetectDependenciesModel
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

      moveSong: (props: MoveSongModel) => Promise<ResponseModel>
      renameSong: (props: RenameSongModel) => Promise<ResponseModel>
      removeSong: (props: RemoveSongModel) => Promise<ResponseModel>

      downloadSong: (props: DownloadSongModel) => Promise<ResponseModel>
      onDownloadSongProgress: (callback: (data: DownloadSongProgressModel) => void) => void

      onUpdatedPlaylist: (callback: (data: OnUpdatePlaylist) => void) => void

      detectDependencies: () => Promise<DetectDependenciesModel>
    }
  }
}

import type { PlaylistInfo, VideoInfo, VideoProgress } from 'ytdlp-nodejs'
import { create } from 'zustand'

interface DownloadProps {
  isDownloading: boolean
  progress: VideoProgress | null
  info: VideoInfo | PlaylistInfo | null
  setIsDownloading: (value: boolean) => void
  setProgress: (value: VideoProgress | null) => void
  setInfoSong: (value: VideoInfo | PlaylistInfo | null) => void
  clearState: () => void
}

export const useDownloadStore = create<DownloadProps>((set) => ({
  isDownloading: false,
  progress: null,
  info: null,
  setIsDownloading: (value) => set({ isDownloading: value }),
  setProgress: (value) => set({ progress: value }),
  setInfoSong: (value) => set({ info: value }),
  clearState: () => set({ isDownloading: false, progress: null, info: null })
}))

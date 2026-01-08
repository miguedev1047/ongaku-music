import type { SongModel } from '@shared/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_URL_IMG } from '@/constants/general'

type StateType = 'loaded' | 'error' | 'idle'

interface MediaState {
  currentSong: SongModel | null
  state: StateType
  isPlaying: boolean
  isMuted: boolean
  volumen: number
  playlist: string
  currentTime: number
  duration: number
  isShuffle: boolean
  isLoop: boolean
  ref: HTMLAudioElement | null

  // Getters (computed values)
  audioSrc: () => string | undefined
  songPicture: () => string
  songPlaylist: () => string
  songTitle: () => string

  // Actions
  setSong: (song: SongModel) => void
  setState: (state: StateType) => void
  setMuted: (value: boolean) => void
  toggleMute: () => void
  setPlay: (value: boolean) => void
  togglePlay: () => void
  setVolumen: (vol: number) => void
  setPlaylist: (value: string) => void
  setCurrentTime: (value: number) => void
  setMediaRef: (value: HTMLAudioElement) => void
  setDuration: (value: number) => void
  setShuffle: (value: boolean) => void
  toggleShuffle: () => void
  setLoop: (value: boolean) => void
  toggleLoop: () => void
}

export const useMediaStore = create<MediaState>()(
  persist(
    (set, get) => ({
      // State
      currentSong: null,
      state: 'idle',
      playlist: 'Default',
      isMuted: false,
      isPlaying: false,
      volumen: 100,
      currentTime: 0,
      duration: 0,
      isShuffle: false,
      isLoop: false,
      ref: null,

      // Getters
      audioSrc: () => get().currentSong?.src,
      songPicture: () => get().currentSong?.picture || DEFAULT_URL_IMG,
      songPlaylist: () => get().currentSong?.playlist || 'Default',
      songTitle: () => get().currentSong?.title || 'None',

      // Actions
      setSong: (song) => set({ currentSong: song }),

      setMuted: (value) => set({ isMuted: value }),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      setPlay: (value) => set({ isPlaying: value }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      setVolumen: (vol) => set({ volumen: vol }),

      setPlaylist: (value) => set({ playlist: value }),

      setCurrentTime: (value) => set({ currentTime: value }),

      setMediaRef: (value) => set({ ref: value }),

      setDuration: (value) => set({ duration: value }),

      setShuffle: (value) => set({ isShuffle: value }),
      toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

      setLoop: (value) => set({ isLoop: value }),
      toggleLoop: () => set((state) => ({ isLoop: !state.isLoop })),

      setState: (state) => set({ state })
    }),
    {
      name: 'media-store',
      partialize: (state) => ({
        currentSong: state.currentSong,
        isPlaying: state.isPlaying,
        isMuted: state.isMuted,
        volumen: state.volumen,
        playlist: state.playlist,
        isShuffle: state.isShuffle,
        isLoop: state.isLoop,
        state: state.state
        // Omitimos: ref, currentTime, duration
      })
    }
  )
)

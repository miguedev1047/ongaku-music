import { SongModel } from '@shared/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RecentSongsStore {
  songs: SongModel[]
  pushRecentSong: (song: SongModel) => void
}

const MAX_RECENT = 10

export const useRecentSongsStore = create<RecentSongsStore>()(
  persist(
    (set, get) => ({
      songs: [],
      pushRecentSong: (song) => {
        const { songs } = get()
        const filtered = songs.filter((s) => s.title !== song.title)
        set({ songs: [song, ...filtered].slice(0, MAX_RECENT) })
      }
    }),
    {
      name: 'recent-songs'
    }
  )
)

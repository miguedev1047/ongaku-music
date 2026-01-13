import { create } from 'zustand'

interface SearchState {
  playlistTerm: string
  songTerm: string

  setPlaylistTerm: (term: string) => void
  setSongTerm: (term: string) => void

  clearPlaylistTerm: () => void
  clearSongTerm: () => void

  clearAllTerms: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  playlistTerm: '',
  songTerm: '',

  setPlaylistTerm: (term) => set({ playlistTerm: term }),
  setSongTerm: (term) => set({ songTerm: term }),

  clearPlaylistTerm: () => set({ playlistTerm: '' }),
  clearSongTerm: () => set({ songTerm: '' }),

  clearAllTerms: () => set({ playlistTerm: '', songTerm: '' })
}))

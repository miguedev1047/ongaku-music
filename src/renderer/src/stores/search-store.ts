import { create } from 'zustand'

interface SearchState {
  playlistsModalOpen: boolean
  songsModalOpen: boolean
  playlistTerm: string
  songTerm: string

  togglePlaylistModal: () => void
  toggleSongModal: () => void
  setPlaylistTerm: (term: string) => void
  setSongTerm: (term: string) => void
  clearPlaylistTerm: () => void
  clearSongTerm: () => void
  clearAllTerms: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  playlistsModalOpen: false,
  songsModalOpen: false,
  playlistTerm: '',
  songTerm: '',

  togglePlaylistModal: () =>
    set((state) => ({
      playlistsModalOpen: !state.playlistsModalOpen
    })),

  toggleSongModal: () =>
    set((state) => ({
      songsModalOpen: !state.songsModalOpen
    })),

  setPlaylistTerm: (term) => set({ playlistTerm: term }),
  setSongTerm: (term) => set({ songTerm: term }),

  clearPlaylistTerm: () => set({ playlistTerm: '' }),
  clearSongTerm: () => set({ songTerm: '' }),
  clearAllTerms: () => set({ playlistTerm: '', songTerm: '' })
}))

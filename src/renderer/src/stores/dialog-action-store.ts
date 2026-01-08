import { PlaylistModel } from '@shared/models'
import { create } from 'zustand'

type DialogType = 'none' | 'new' | 'remove' | 'rename'

interface DialogActionState {
  isOpen: boolean
  type: DialogType
  selectedPlaylist: PlaylistModel | null
  openDialog: (type: DialogType) => void
  setPlaylist: (data: PlaylistModel) => void
  closeDialog: () => void
  toggleOpen: () => void
}

export const useDialogActionStore = create<DialogActionState>((set, get) => ({
  isOpen: false,
  type: 'none',
  selectedPlaylist: null,

  openDialog: (type) => set({ isOpen: true, type }),

  closeDialog: () => set({ isOpen: false, type: 'none', selectedPlaylist: null }),

  setPlaylist: (data) => set({ selectedPlaylist: data }),

  toggleOpen: () => {
    const state = get()
    if (state.type !== 'none') {
      set({ isOpen: false, type: 'none', selectedPlaylist: null })
      return
    }
    set({ isOpen: !state.isOpen })
  }
}))

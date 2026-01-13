import type {
  DialogAction,
  DialogKey,
  DialogOpenState,
  DialogPayload,
  DialogStore
} from '@/types/dialog-actions'
import { create } from 'zustand'

export const useDialogStore = create<DialogStore>((set) => ({
  dialog: { isOpen: false, key: null, action: null, payload: null },

  toggle: (value) => set({ dialog: { isOpen: value, key: null, action: null, payload: null } }),

  open: <K extends DialogKey, A extends DialogAction<K>>(
    key: K,
    action: A,
    payload: DialogPayload<K, A>
  ) => set({ dialog: { isOpen: true, key, action, payload } as DialogOpenState }),

  close: () => set({ dialog: { isOpen: false, key: null, action: null, payload: null } })
}))

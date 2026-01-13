import { PlaylistModel, SongModel } from '@shared/models'

// SCHEMA DIALOG ACTIONS
export interface DialogActionMap {
  playlist: {
    new: null
    rename: { playlist: PlaylistModel }
    remove: { playlist: PlaylistModel }
    search: null
  }
  song: {
    rename: { song: SongModel }
    remove: { song: SongModel }
    markAsFavorite: { song: SongModel }
    move: { song: SongModel }
    search: null
  }
}

// GENERIC TYPES - IGNORE

export type DialogKey = keyof DialogActionMap
export type DialogAction<K extends DialogKey> = keyof DialogActionMap[K]
export type DialogPayload<K extends DialogKey, A extends DialogAction<K>> = DialogActionMap[K][A]

export type DialogOpenState = {
  [K in DialogKey]: {
    [A in DialogAction<K>]: {
      isOpen: boolean
      key: K
      action: A
      payload: DialogPayload<K, A>
    }
  }[DialogAction<K>]
}[DialogKey]

export type DialogState =
  | { isOpen: boolean; key: null; action: null; payload: null }
  | DialogOpenState

export interface DialogStore {
  dialog: DialogState
  open: <K extends DialogKey, A extends DialogAction<K>>(
    key: K,
    action: A,
    payload: DialogPayload<K, A>
  ) => void
  toggle: (value: boolean) => void
  close: () => void
}

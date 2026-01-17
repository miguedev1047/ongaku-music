import chokidar, { FSWatcher } from 'chokidar'
import { type BrowserWindow } from 'electron'
import { PLAYLIST_DIR } from '../../shared/directories'
import { getTitle } from './get-title'
import { dirname } from 'node:path'

interface WatcherEventPayload {
  event: 'add' | 'remove'
  path: string
  playlist: string
  type: 'playlist' | 'song'
}

interface NotifyUpdateParams {
  path: string
  event: 'add' | 'remove'
  type: 'playlist' | 'song'
  isPlaylist?: boolean
}

interface ScheduleUpdate {
  path: string
  event: 'add' | 'remove'
  type: 'playlist' | 'song'
}

interface AppWatcherDependencies {
  mainWindow: BrowserWindow | null
  debounceMs?: number
}

let watcher: FSWatcher | null = null
let updateTimeout: NodeJS.Timeout | null = null

export function appWatcher({ mainWindow, debounceMs = 300 }: AppWatcherDependencies): void {
  if (!mainWindow) return

  watcher = chokidar.watch(PLAYLIST_DIR, {
    ignoreInitial: true
  })

  const sendUpdateToRenderer = (payload: WatcherEventPayload): void => {
    if (!mainWindow.isDestroyed()) {
      mainWindow.webContents.send('on-updated-playlist', payload)
    }
  }

  const scheduleUpdate = (props: ScheduleUpdate): void => {
    const { path, event, type } = props
    if (updateTimeout) {
      clearTimeout(updateTimeout)
    }

    updateTimeout = setTimeout(() => {
      sendUpdateToRenderer({ event, path, playlist: getTitle(path), type })
      updateTimeout = null
    }, debounceMs)
  }

  const handleNotifyUpdate = (props: NotifyUpdateParams): void => {
    const { path, event, type, isPlaylist = false } = props
    if (mainWindow.isDestroyed()) return
    if (isPlaylist && dirname(path) !== PLAYLIST_DIR) return
    scheduleUpdate({ path, event, type })
  }

  watcher
    .on('addDir', (path) =>
      handleNotifyUpdate({ path, event: 'add', type: 'playlist', isPlaylist: true })
    )
    .on('unlinkDir', (path) =>
      handleNotifyUpdate({ path, event: 'remove', type: 'playlist', isPlaylist: true })
    )
    .on('add', (path) => handleNotifyUpdate({ path, event: 'add', type: 'song' }))
    .on('unlink', (path) => handleNotifyUpdate({ path, event: 'remove', type: 'song' }))
}

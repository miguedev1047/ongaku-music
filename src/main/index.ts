import icon from '../../resources/icon.png?asset'
import type {
  // GetSong,
  GetSongsByPlaylist,
  NewPlaylist,
  OpenFolderPlaylist,
  RemovePlaylist,
  RenamePlaylist,
  DownloadSong
} from '../shared/types'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { join } from 'node:path'
import { getPlaylistIpc } from './ipc/get-playlists'
import { playlistOptionsIpc } from './ipc/playlist-opts'
import { getSongsByPlaylistsIpc } from './ipc/get-songs-by-playlist'
import { downloadSong } from './lib/downloader-core'
import { startMediaServer } from '../server/root'
import { setupAutoUpdater } from './updater'

startMediaServer()

let mainWindow: BrowserWindow | null = null

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false
    }
  })

  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // and load the index.html of the app.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // setupAutoUpdater(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('ping', () => console.log('Pong!'))

  ipcMain.handle('get-playlists', () => getPlaylistIpc.get())
  ipcMain.handle('get-songs-by-playlist', (_event, ...args: Parameters<GetSongsByPlaylist>) =>
    getSongsByPlaylistsIpc.get(...args)
  )

  ipcMain.handle('new-playlist', (_event, ...args: Parameters<NewPlaylist>) =>
    playlistOptionsIpc.newPlaylist(...args)
  )
  ipcMain.handle('remove-playlist', (_event, ...args: Parameters<RemovePlaylist>) =>
    playlistOptionsIpc.removePlaylist(...args)
  )
  ipcMain.handle('rename-playlist', (_event, ...args: Parameters<RenamePlaylist>) =>
    playlistOptionsIpc.renamePlaylist(...args)
  )
  ipcMain.handle('open-folder-playlist', (_event, ...args: Parameters<OpenFolderPlaylist>) =>
    playlistOptionsIpc.openPlaylistFolder(...args)
  )
  ipcMain.handle('download-song', (_event, ...args: Parameters<DownloadSong>) =>
    downloadSong(...args)
  )

  createWindow()

  if (mainWindow) {
    setupAutoUpdater(mainWindow)
  }

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

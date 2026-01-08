import type {
  GetSong,
  GetSongsByPlaylist,
  NewPlaylist,
  OpenFolderPlaylist,
  RemovePlaylist,
  RenamePlaylist,
  DownloadSong
} from '../shared/types'

import { app, BrowserWindow, ipcMain, protocol, shell } from 'electron'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import path, { join } from 'node:path'

import { picturePath, songPath } from './utils/local-resource'
import {
  getPlaylists,
  getSongsByPlaylist,
  newPlaylist,
  openFolderPlaylist,
  removePlaylist,
  renamePlaylist
} from './lib/playlist-manager'
import { downloadSong } from './lib/downloader-core'
import { getSongByFilename } from './lib/song-manager'
import { PRIVILEGES } from '../shared/constants'
import { startMediaServer } from '../server'
import { setupAutoUpdater } from './updater'

// Create a protocol handler
protocol.registerSchemesAsPrivileged([
  { scheme: 'song-path', privileges: PRIVILEGES },
  { scheme: 'picture-path', privileges: PRIVILEGES }
])

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 640,
    show: false,
    backgroundColor: '#000',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(import.meta.dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // and load the index.html of the app.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    setTimeout(() => mainWindow.show(), 500)
  })

  setupAutoUpdater(mainWindow)
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

  ipcMain.handle('get-playlists', () => getPlaylists())
  ipcMain.handle('get-songs-by-playlist', (_event, ...args: Parameters<GetSongsByPlaylist>) =>
    getSongsByPlaylist(...args)
  )
  ipcMain.handle('get-song-by-filename', (_event, ...args: Parameters<GetSong>) =>
    getSongByFilename(...args)
  )

  ipcMain.handle('new-playlist', (_event, ...args: Parameters<NewPlaylist>) => newPlaylist(...args))
  ipcMain.handle('remove-playlist', (_event, ...args: Parameters<RemovePlaylist>) =>
    removePlaylist(...args)
  )
  ipcMain.handle('rename-playlist', (_event, ...args: Parameters<RenamePlaylist>) =>
    renamePlaylist(...args)
  )
  ipcMain.handle('open-folder-playlist', (_event, ...args: Parameters<OpenFolderPlaylist>) =>
    openFolderPlaylist(...args)
  )
  ipcMain.handle('download-song', (_event, ...args: Parameters<DownloadSong>) =>
    downloadSong(...args)
  )
  // ipcMain.on(
  //   "start-watch-playlist",
  //   (_event, ...args: Parameters<WatchPlaylist>) => watchPlaylist(...args)
  // )

  protocol.handle('song-path', songPath)
  protocol.handle('picture-path', picturePath)

  startMediaServer()

  createWindow()

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

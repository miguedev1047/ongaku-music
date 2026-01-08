// this a commonJs module
import ap from 'electron-updater'

import { BrowserWindow, dialog } from 'electron'
import { is } from '@electron-toolkit/utils'

export function setupAutoUpdater(win: BrowserWindow) {
  // Solo ejecutar auto-updater en producción
  if (is.dev) {
    console.log('Auto-updater disabled in development mode')
    return
  }

  ap.autoUpdater.autoDownload = false
  ap.autoUpdater.autoInstallOnAppQuit = true

  ap.autoUpdater.on('update-available', (info) => {
    dialog
      .showMessageBox(win, {
        type: 'info',
        title: 'Update available',
        message: `A new version (${info.version}) is available. Do you want to download it?`,
        buttons: ['Download', 'Later'],
        defaultId: 0
      })
      .then((result) => {
        if (result.response === 0) {
          ap.autoUpdater.downloadUpdate()
        }
      })
  })

  ap.autoUpdater.on('download-progress', (progress) => {
    win.webContents.send('update-download-progress', progress)
  })

  ap.autoUpdater.on('update-downloaded', (info) => {
    dialog
      .showMessageBox(win, {
        type: 'question',
        buttons: ['Restart', 'Later'],
        title: 'Update ready',
        message: `Update ${info.version} downloaded. Restart now?`
      })
      .then((result) => {
        if (result.response === 0) {
          ap.autoUpdater.quitAndInstall()
        }
      })
  })

  ap.autoUpdater.on('error', (err) => {
    console.error('Auto update error:', err)
    dialog.showErrorBox(
      'Update Error',
      err.message || 'An error occurred while checking for updates'
    )
  })

  // Verificar actualizaciones al iniciar y luego cada hora
  ap.autoUpdater.checkForUpdates()
  setInterval(() => {
    ap.autoUpdater.checkForUpdates()
  }, 3600000) // 1 hora
}

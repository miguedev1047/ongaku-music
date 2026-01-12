import { join } from 'node:path'
import { PLAYLIST_DIR } from '../../shared/directories'
import { shell } from 'electron'

import fs from 'fs-extra'

// Open folder playlist
export async function openFolderPlaylist(playlistName: string) {
  const playlistPath = join(PLAYLIST_DIR, playlistName)

  if (!fs.existsSync(playlistPath)) {
    throw new Error('Playlist does not exist')
  }

  await shell.openPath(playlistPath)
}

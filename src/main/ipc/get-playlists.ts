import fs from 'fs-extra'
import type { GetPlayListPathModel } from '../../shared/models'

import { PLAYLIST_DIR } from '../../shared/directories'
import { join } from 'node:path'
import { readdir, stat } from 'node:fs/promises'
import { generateFileId } from '../utils/generate-id'

export function getPlaylists() {
  async function get(): Promise<GetPlayListPathModel[]> {
    try {
      await fs.ensureDir(PLAYLIST_DIR)

      const items = await readdir(PLAYLIST_DIR, { encoding: 'utf8' })

      const playlists = await Promise.all(
        items.filter((item) => !item.startsWith('.')).map(mapPlaylist)
      )

      return playlists
        .filter((p): p is GetPlayListPathModel => p !== null)
        .sort((a, b) => new Date(b.birthdate).getTime() - new Date(a.birthdate).getTime())
    } catch (error) {
      console.error('Ah ocurred a error to read the playlists:', error)
      return []
    }
  }

  async function mapPlaylist(filename: string): Promise<GetPlayListPathModel | null> {
    const filePath = join(PLAYLIST_DIR, filename)
    await fs.ensureDir(PLAYLIST_DIR)
    const fileStat = await stat(filePath)

    const songs = await readdir(filePath, {
      encoding: 'utf-8',
      withFileTypes: true
    })

    if (!fileStat.isDirectory()) return null

    const finalData: GetPlayListPathModel = {
      id: generateFileId(filePath),
      path: filePath,
      title: filename.replace(/\.[^/.]+$/, ''),
      totalSongs: songs.length,
      filename: filename,
      birthdate: fileStat.mtime.toISOString(),
      isDirectory: fileStat.isDirectory()
    }

    return finalData
  }

  return { get }
}

export const getPlaylistIpc = getPlaylists()

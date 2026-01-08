import type { SongModel } from '../../shared/models'
import { basename, extname, join } from 'node:path'
import { PLAYLIST_DIR } from '../../shared/constants'
import { stat } from 'node:fs/promises'
import { parseFile } from 'music-metadata'
import { getSongImage } from '../utils/gen-song-image'
import { removeExtension } from '../utils/remove-extension'

import fs from 'fs-extra'

export async function getSongByFilename(
  filename: string,
  playlist: string | undefined
): Promise<SongModel | null> {
  if (!playlist) return null

  const playlistDir = join(PLAYLIST_DIR, playlist)
  await fs.ensureDir(playlistDir)

  const fileSource = join(playlistDir, filename)
  const metadata = await parseFile(fileSource)
  const stats = await stat(fileSource)

  let picture: null | string = null

  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const [firstPicture] = metadata.common.picture
    const { data, format } = firstPicture
    const cleanFilename = basename(filename)
    const base64String = Buffer.from(data).toString('base64')
    const localPath = await getSongImage({
      base64String,
      format,
      title: removeExtension(cleanFilename)
    })
    picture = `picture-path://${localPath}`
  }

  const finalData: SongModel = {
    title: removeExtension(filename),
    extension: extname(filename),
    filename: filename,
    playlist: playlist,
    src: fileSource,
    artist: metadata.common.artist || 'Unknown Artist',
    album: metadata.common.album || 'Unknown Album',
    duration: metadata.format.duration || 0,
    picture,
    birthtime: stats.birthtime
  }

  return finalData
}

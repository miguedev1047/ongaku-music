import fs from 'fs-extra'
import type { GetSongsByPlaylistModel, SongMetadataModel } from '../../shared/models'
import { PLAYLIST_DIR } from '../../shared/directories'
import { extname, join } from 'node:path'
import { readdir, stat } from 'node:fs/promises'
import { filterByExtension } from '../utils/filter-by-extension'
import { generateFileId } from '../utils/generate-id'
import { getTitle } from '../../server/utils/get-title'
import { getAudioUrl, getCoverUrl, getSongMetadata } from '../../shared/helpers'

const metadataCache = new Map<string, SongMetadataModel>()

function getSongsByPlaylists() {
  async function get(playlist: string | undefined): Promise<GetSongsByPlaylistModel[]> {
    if (!playlist) return []
    const playlistDir = join(PLAYLIST_DIR, playlist)
    await fs.ensureDir(playlistDir)
    const readSongs = await readdir(playlistDir, {
      encoding: 'utf-8',
      withFileTypes: false
    })
    const entry = readSongs.filter((song) => filterByExtension(song))
    const songs = await Promise.all(entry.map((song) => songPath(song, playlist)))
    const sorted = songs.sort((a, b) => a.birthtime.getTime() - b.birthtime.getTime())
    return sorted
  }

  async function songPath(
    filename: string,
    playlistName: string
  ): Promise<GetSongsByPlaylistModel> {
    const playlistPath = join(PLAYLIST_DIR, playlistName)
    const fileSource = join(playlistPath, filename)
    const stats = await stat(fileSource)

    const cacheKey = `${playlistPath}/${filename}`
    let songMetadata = metadataCache.get(cacheKey)

    if (!songMetadata) {
      songMetadata = await getSongMetadata(fileSource)
      metadataCache.set(cacheKey, songMetadata)
    }

    const finalData: GetSongsByPlaylistModel = {
      id: generateFileId(fileSource),
      path: fileSource,
      title: getTitle(filename),
      extension: extname(filename),
      playlist: playlistName,
      audioUrl: getAudioUrl(fileSource),
      picture: getCoverUrl(fileSource),
      metadata: songMetadata,
      birthtime: stats.birthtime
    }
    return finalData
  }
  return { get }
}
export const getSongsByPlaylistsIpc = getSongsByPlaylists()

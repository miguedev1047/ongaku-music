import type {
  GetPlayListPathModel,
  GetSongsByPlaylistModel,
  RemovePlaylistModel,
  ResponseModel,
  SongModel
} from '../../shared/models'

import { PLAYLIST_DIR } from '../../shared/constants'

import { extname, join } from 'node:path'
import { mkdir, readdir, rename, rm, stat } from 'node:fs/promises'
import { parseFile } from 'music-metadata'
import { removeExtension } from '../utils/remove-extension'
import { filterByExtension } from '../utils/filter-by-extension'
import { getSongImage } from '../utils/gen-song-image'
import { shell } from 'electron'
import { basename } from 'node:path'

import fs from 'fs-extra'

// Managment playlists //

export async function getPlaylists(): Promise<GetPlayListPathModel[]> {
  await fs.ensureDir(PLAYLIST_DIR)

  const playlists = await readdir(PLAYLIST_DIR, {
    encoding: 'utf8',
    withFileTypes: true
  })
  const entry = playlists.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  const folders = await Promise.all(entry.map(getPlayListPath))
  const sorted = folders.sort((a, b) => a.birthtime.getTime() - b.birthtime.getTime())
  return sorted
}

export async function getPlayListPath(filename: string): Promise<GetPlayListPathModel> {
  const fileSource = join(PLAYLIST_DIR, filename)
  await fs.ensureDir(PLAYLIST_DIR)

  const stats = await stat(fileSource)
  const songs = await readdir(fileSource, {
    encoding: 'utf-8',
    withFileTypes: true
  })

  const finalData = {
    title: filename,
    playlist: filename,
    totalSongs: songs.length,
    birthtime: stats.birthtime
  }

  return finalData
}

// Managment songs in playlists //

export async function getSongsByPlaylist(
  playlist: string | undefined
): Promise<GetSongsByPlaylistModel[]> {
  if (!playlist) return []

  const playlistDir = join(PLAYLIST_DIR, playlist)
  await fs.ensureDir(playlistDir)

  const readSongs = await readdir(playlistDir, {
    encoding: 'utf-8',
    withFileTypes: false
  })
  const entry = readSongs.filter((song) => filterByExtension(song))

  const songs = await Promise.all(entry.map((song) => getSongPlaylistByPath(song, playlist)))
  const sorted = songs.sort((a, b) => a.birthtime.getTime() - b.birthtime.getTime())
  return sorted
}

export async function getSongPlaylistByPath(
  filename: string,
  playlistName: string
): Promise<GetSongsByPlaylistModel> {
  const playlistPath = join(PLAYLIST_DIR, playlistName)
  const fileSource = join(playlistPath, filename)
  const metadata = await parseFile(fileSource)

  const stats = await stat(fileSource)

  let picture: null | string = null

  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const [firstPicture] = metadata.common.picture
    const { data, format } = firstPicture!
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
    playlist: playlistName,
    src: `song-path://${fileSource}`,
    artist: metadata.common.artist || 'Unknown Artist',
    album: metadata.common.album || 'Unknown Album',
    duration: metadata.format.duration || 0,
    picture,
    birthtime: stats.birthtime
  }

  return finalData
}

// New playlist //

export async function newPlaylist(playlistName: string): Promise<ResponseModel> {
  const playlistPath = join(PLAYLIST_DIR, playlistName)

  try {
    if (fs.existsSync(playlistPath)) {
      return {
        message: 'Playlist already exists',
        code: 'ERROR'
      }
    }

    await mkdir(playlistPath)
    return {
      message: 'Playlist created',
      code: 'SUCCESS'
    }
  } catch {
    return {
      message: 'An unknown error occurred while creating the playlist.',
      code: 'ERROR'
    }
  }
}

// Rename playlist

export async function renamePlaylist(props: RemovePlaylistModel): Promise<ResponseModel> {
  try {
    const { oldName, newName } = props

    const oldPlaylistPath = join(PLAYLIST_DIR, oldName)
    const newPlaylistPath = join(PLAYLIST_DIR, newName)

    if (fs.existsSync(newPlaylistPath)) {
      return {
        message: 'Playlist already exists',
        code: 'ERROR'
      }
    }

    if (!fs.existsSync(oldPlaylistPath)) {
      return {
        message: 'The playlist path not found',
        code: 'ERROR'
      }
    }

    if (newPlaylistPath === oldPlaylistPath) {
      return {
        message: 'New playlist name cannot be the same as old playlist name',
        code: 'ERROR'
      }
    }

    await rename(oldPlaylistPath, newPlaylistPath)

    return {
      message: 'Playlist renamed',
      code: 'SUCCESS'
    }
  } catch {
    return {
      message: 'An unknown error occurred while renaming the playlist.',
      code: 'ERROR'
    }
  }
}

// Remove playlist

export async function removePlaylist(playlistName: string): Promise<ResponseModel> {
  const playlistPath = join(PLAYLIST_DIR, playlistName)

  if (!fs.existsSync(playlistPath)) {
    return {
      message: 'Playlist not found',
      code: 'ERROR'
    }
  }

  await rm(playlistPath, { recursive: true })

  return {
    message: 'Playlist removed',
    code: 'SUCCESS'
  }
}

// Open folder playlist
export async function openFolderPlaylist(playlistName: string) {
  const playlistPath = join(PLAYLIST_DIR, playlistName)

  if (!fs.existsSync(playlistPath)) {
    throw new Error('Playlist does not exist')
  }

  await shell.openPath(playlistPath)
}

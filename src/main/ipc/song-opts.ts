import type {
  MoveSongModel,
  RemoveSongModel,
  RenameSongModel,
  ResponseModel
} from '../../shared/models'

import fs from 'fs-extra'

import { join } from 'node:path'
import { PLAYLIST_DIR } from '../../shared/directories'
import { rename, rm } from 'node:fs/promises'

function songOptions() {
  async function moveSong(props: MoveSongModel): Promise<ResponseModel> {
    const { playlistName, fileName, fileSource } = props
    const playlistPath = join(PLAYLIST_DIR, playlistName)
    const fileDestinationPath = join(playlistPath, fileName)

    if (!fs.existsSync(playlistPath)) {
      return { message: 'Playlist not found', code: 'ERROR' }
    }

    if (fs.existsSync(fileDestinationPath)) {
      return { message: 'There is already a song with that name', code: 'ERROR' }
    }

    try {
      await fs.move(fileSource, fileDestinationPath)
      return { code: 'SUCCESS', message: 'File moved successfully' }
    } catch {
      return { code: 'ERROR', message: 'An ocurred a error to move song' }
    }
  }
  async function renameSong(props: RenameSongModel): Promise<ResponseModel> {
    const { oldName, newName, playlistName } = props

    const oldSongPath = join(PLAYLIST_DIR, playlistName, oldName)
    const newSongPath = join(PLAYLIST_DIR, playlistName, newName)

    if (fs.existsSync(newSongPath)) {
      return { message: 'This song already exists', code: 'ERROR' }
    }

    if (!fs.existsSync(oldSongPath)) {
      return { message: 'The song path not found', code: 'ERROR' }
    }

    if (newSongPath === oldSongPath) {
      return { message: 'New song name cannot be the same as old song name', code: 'ERROR' }
    }

    try {
      await rename(oldSongPath, newSongPath)
      return { message: 'Song renamed', code: 'SUCCESS' }
    } catch {
      return { message: 'An unknown error occurred while renaming the song', code: 'ERROR' }
    }
  }

  async function removeSong(props: RemoveSongModel): Promise<ResponseModel> {
    const { playlistName, songName } = props
    const songPath = join(PLAYLIST_DIR, playlistName, songName)

    if (!fs.existsSync(songPath)) {
      return { message: 'Song not found', code: 'ERROR' }
    }

    try {
      await rm(songPath)
      return { message: 'Song removed', code: 'SUCCESS' }
    } catch {
      return { message: 'An ocurred a error to remove the song', code: 'ERROR' }
    }
  }

  return { moveSong, renameSong, removeSong }
}

export const songOptionsIpc = songOptions()

import type { RemovePlaylistModel, ResponseModel } from '../../shared/models'

import { PLAYLIST_DIR } from '../../shared/directories'

import { join } from 'node:path'
import { mkdir, rename, rm } from 'node:fs/promises'
import { shell } from 'electron'

import fs from 'fs-extra'

function playlistOptions() {
  // New playlist //

  async function newPlaylist(playlistName: string): Promise<ResponseModel> {
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

  async function renamePlaylist(props: RemovePlaylistModel): Promise<ResponseModel> {
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

  async function removePlaylist(playlistName: string): Promise<ResponseModel> {
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
  async function openPlaylistFolder(playlistName: string) {
    const playlistPath = join(PLAYLIST_DIR, playlistName)

    if (!fs.existsSync(playlistPath)) {
      throw new Error('Playlist does not exist')
    }

    await shell.openPath(playlistPath)
  }

  return { newPlaylist, renamePlaylist, removePlaylist, openPlaylistFolder }
}

export const playlistOptionsIpc = playlistOptions()

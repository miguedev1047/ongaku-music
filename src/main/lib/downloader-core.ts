import type { DownloadSongModel, ResponseModel } from '../../shared/models'
import { PLAYLIST_DIR } from '../../shared/constants'
import { join } from 'node:path'
import { YtDlp } from 'ytdlp-nodejs'
import { BrowserWindow } from 'electron'
import { detectBinary } from '../utils/detect-bin'

let ytdlpInstance: YtDlp | null = null

export function getYtDlp() {
  if (ytdlpInstance) return ytdlpInstance

  const binaryPath = detectBinary('yt-dlp')
  const ffmpegPath = detectBinary('ffmpeg')

  if (!binaryPath || !ffmpegPath) return null

  ytdlpInstance = new YtDlp({ binaryPath, ffmpegPath })
  return ytdlpInstance
}

export async function downloadSong(props: DownloadSongModel): Promise<ResponseModel> {
  const { playlistName, songUrl } = props

  const ytdlp = getYtDlp()

  if (!ytdlp) {
    return {
      code: 'ERROR',
      message: 'You must installed the binaries'
    }
  }

  const win = BrowserWindow.getAllWindows()[0]
  const playlistPath = join(PLAYLIST_DIR, playlistName)

  try {
    const songInfo = await ytdlp.getInfoAsync(songUrl)

    if (!songInfo) {
      return {
        code: 'ERROR',
        message: 'Information about this song is not available.'
      }
    }

    await ytdlp.downloadAsync(songUrl, {
      onProgress: (progress) => {
        const info = { progress: progress, info: songInfo }
        win.webContents.send('on-download-progress-song', info)
      },
      format: {
        filter: 'audioonly',
        type: 'm4a',
        quality: 5
      },
      output: `${playlistPath}/%(title)s.%(ext)s`,
      audioFormat: 'm4a',
      embedThumbnail: true,
      embedMetadata: true
    })

    return {
      code: 'SUCCESS',
      message: 'Song downloaded'
    }
  } catch (error) {
    console.log(`[ERROR]: ${error}`)

    return {
      code: 'ERROR',
      message: 'An ocurred a error to try download this song'
    }
  }
}

import type { DownloadSongModel, ResponseModel } from '../../shared/models'
import { PLAYLIST_DIR, YT_BIN_PATH, FFMPEG_BIN_PATH } from '../../shared/constants'
import { join, resolve } from 'node:path'
import { YtDlp } from 'ytdlp-nodejs'
import { BrowserWindow } from 'electron'

const ytdlp = new YtDlp({
  binaryPath: resolve(YT_BIN_PATH),
  ffmpegPath: resolve(FFMPEG_BIN_PATH)
})

export async function downloadSong(props: DownloadSongModel): Promise<ResponseModel> {
  const { playlistName, songUrl } = props

  const win = BrowserWindow.getFocusedWindow()!
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

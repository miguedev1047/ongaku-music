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
    await ytdlp.downloadAsync(songUrl, {
      onProgress: (progress) => {
        win.webContents.send('download-progress', progress)
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
  } catch {
    return {
      code: 'ERROR',
      message: 'An ocurred a error to try download this song'
    }
  }
}

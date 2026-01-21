import { detectBinary } from '../utils/detect-bin'

function isPlatformSupported() {
  return (
    process.platform === 'win32' || process.platform === 'linux' || process.platform === 'darwin'
  )
}

function detectDownloadBinaries() {
  return {
    ytdlp: Boolean(detectBinary('yt-dlp')),
    ffmpeg: Boolean(detectBinary('ffmpeg'))
  }
}

export async function detectDependencies() {
  const supported = isPlatformSupported()

  if (!supported) {
    return {
      platform: process.platform,
      supported: false,
      ytdlp: false,
      ffmpeg: false
    }
  }

  const bins = detectDownloadBinaries()

  return {
    platform: process.platform,
    supported: true,
    ...bins
  }
}

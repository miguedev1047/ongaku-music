export const INSTALL_COMMANDS: Record<string, { ytdlp: string; ffmpeg: string } | undefined> = {
  windows: {
    ytdlp: 'winget install yt-dlp',
    ffmpeg: 'winget install Gyan.FFmpeg'
  },
  linux: {
    ytdlp: 'sudo apt install yt-dlp || sudo pacman -S yt-dlp || pip install yt-dlp',
    ffmpeg: 'sudo apt install ffmpeg || sudo pacman -S ffmpeg'
  },
  macos: {
    ytdlp: 'brew install yt-dlp',
    ffmpeg: 'brew install ffmpeg'
  },
  darwin: {
    ytdlp: 'brew install yt-dlp',
    ffmpeg: 'brew install ffmpeg'
  }
}

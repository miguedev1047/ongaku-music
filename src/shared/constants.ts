import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'

// App Directories
export const HOME_DIR = homedir()
export const APP_DIR = join(HOME_DIR, 'Music', 'Ongaku')
export const PLAYLIST_DIR = join(APP_DIR, 'Playlists')
export const TEMP_DIR = join(tmpdir(), 'ongaku-cache')
export const DEFAULT_PLAYLIST_DIR = join(HOME_DIR, 'Music', 'Ongaku', 'Playlists', 'Default')

// Extensions
export const EXTENSIONS = ['.mp3', '.wav', '.flac', '.ogg', '.m4a', '.mp4']
export const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp']

// Permissions Flags
export const PRIVILEGES = {
  secure: true,
  supportFetchAPI: true,
  standard: true,
  bypassCSP: true,
  stream: true
}

// Reserved Words
export const RESERVED = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'LPT1', '.', '..']

// Bin Paths
// TODO: REFACTOR THIS FOR DETECTION
export const YT_BIN_PATH = '/usr/local/bin/yt-dlp'
export const FFMPEG_BIN_PATH = '/usr/local/bin/ffmpeg'

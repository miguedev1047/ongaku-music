// Backend url
export const SERVER_PORT = 64200
export const SERVER_HOST = `http://localhost:${SERVER_PORT}`

// Frontend url
export const FRONTEND_PORT = 5173
export const FRONTEND_HOST = `http://localhost:${FRONTEND_PORT}`

// Extensions
export const MUSIC_EXTENSIONS = ['.mp3', '.wav', '.flac', '.ogg', '.m4a', '.mp4']
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
export const COMMON_PATHS = ['/usr/bin', '/usr/local/bin', '/bin', '/snap/bin']

// Default url image
export const DEFAULT_URL_IMG =
  'https://cdn.iconscout.com/icon/free/png-512/free-music-icon-svg-download-png-439129.png?f=webp&w=256'

// Default metadata
export const DEFAULT_METADATA = {
  artist: 'Unknow Artist',
  album: 'Unknow Album',
  duration: 0
}

// Mime Types for images
export const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp'
}

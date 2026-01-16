import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'

// App Directories
export const HOME_DIR = homedir()
export const APP_DIR = join(HOME_DIR, '.ongaku')
export const PLAYLIST_DIR = join(APP_DIR, 'Playlists')
export const TEMP_DIR = join(tmpdir(), 'ongaku-cache')
export const DEFAULT_PLAYLIST_DIR = join(HOME_DIR, 'Playlists', 'Default')

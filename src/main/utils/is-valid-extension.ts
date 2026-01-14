import { extname } from 'node:path'
import { MUSIC_EXTENSIONS } from '../../shared/constants'

export function isValidExtension(path: string): boolean {
  const ext = extname(path).toLowerCase()
  return ext === '' || MUSIC_EXTENSIONS.includes(ext)
}

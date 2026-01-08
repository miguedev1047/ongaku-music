import { extname } from 'node:path'
import { EXTENSIONS } from '../../shared/constants'

export function isValidExtension(path: string): boolean {
  const ext = extname(path).toLowerCase()
  return ext === '' || EXTENSIONS.includes(ext)
}

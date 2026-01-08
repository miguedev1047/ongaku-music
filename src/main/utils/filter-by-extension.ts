import { EXTENSIONS } from '../../shared/constants'

export function filterByExtension(song: string): boolean {
  return EXTENSIONS.some((extension) => song.endsWith(extension))
}

import { MUSIC_EXTENSIONS } from '../../shared/constants'

export function filterByExtension(song: string): boolean {
  return MUSIC_EXTENSIONS.some((extension) => song.endsWith(extension))
}

import { sep } from 'node:path'

export function getTitle(filePath: string): string {
  const parts = filePath.split(sep)
  const playlistsIndex = parts.indexOf('Playlists')

  if (playlistsIndex === -1) return ''

  return parts[playlistsIndex + 1] ?? null
}

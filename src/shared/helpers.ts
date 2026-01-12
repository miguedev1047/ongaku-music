import { SongMetadataModel } from './models'
import { SERVER_HOST, DEFAULT_URL_IMG } from '../shared/constants'

export function getMimeType(path: string) {
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  if (path.endsWith('.webp')) return 'image/webp'
  return 'image/*'
}

export async function getSongCover(filePath: string): Promise<string> {
  const res = await fetch(`${SERVER_HOST}/cover?filePath=${encodeURIComponent(filePath)}`)
  if (!res.ok) return DEFAULT_URL_IMG
  return res.json()
}

export async function getSongMetadata(filePath: string): Promise<SongMetadataModel> {
  const res = await fetch(`${SERVER_HOST}/metadata?filePath=${encodeURIComponent(filePath)}`)
  if (!res.ok) return { album: 'Unknow Album', artist: 'Unknow Artist', duration: 0 }
  return res.json()
}

export const getCoverUrl = (filePath: string) => {
  return `${SERVER_HOST}/cover?filePath=${encodeURIComponent(filePath)}`
}

export const getAudioUrl = (filePath: string) => {
  return `${SERVER_HOST}/song?filePath=${encodeURIComponent(filePath)}`
}

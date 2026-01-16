import { basename } from 'node:path'

export function getTitle(filePath: string): string {
  return basename(filePath).replace(/\.[^/.]+$/, '')
}

import { createHash } from 'node:crypto'

export function generateFileId(fileSource: string): string {
  return createHash('sha1').update(fileSource).digest('hex')
}

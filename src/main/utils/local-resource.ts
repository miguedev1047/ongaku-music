import fs from 'fs/promises'
import path from 'node:path'
import { APP_DIR, TEMP_DIR } from '../../shared/constants'
import { net } from 'electron'

export function convertPath(originalPath: string): string {
  const match = originalPath.match(/^\/([a-zA-Z])\/(.*)$/)
  if (match) {
    return `${match[1]}:/${match[2]}`
  } else {
    return originalPath
  }
}

function isInsideBaseDir(base: string, target: string): boolean {
  const resolvedBase = path.resolve(base)
  const resolvedTarget = path.resolve(target)
  return resolvedTarget.startsWith(resolvedBase)
}

export async function songPath(request: Request): Promise<Response> {
  const decodedUrl = decodeURIComponent(request.url.replace(/^song-path:\/\//i, '/'))

  if (decodedUrl.includes('..')) {
    return new Response('Forbidden', { status: 403 })
  }

  const fullPath = process.platform === 'win32' ? convertPath(decodedUrl) : decodedUrl

  if (!isInsideBaseDir(APP_DIR, fullPath)) {
    return new Response('Forbidden', { status: 403 })
  }

  try {
    const stat = await fs.stat(fullPath)
    const fileSize = stat.size
    const range = request.headers.get('Range')

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const chunkSize = end - start + 1

      const fileHandle = await fs.open(fullPath, 'r')
      const buffer = Buffer.alloc(chunkSize)
      await fileHandle.read(buffer, 0, chunkSize, start)
      await fileHandle.close()

      return new Response(buffer, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize.toString(),
          'Content-Type': 'audio/mpeg'
        }
      })
    }

    const buffer = await fs.readFile(fullPath)
    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Length': fileSize.toString(),
        'Accept-Ranges': 'bytes',
        'Content-Type': 'audio/mpeg'
      }
    })
  } catch (error) {
    console.error('Error reading file:', error)
    return new Response('File not found', { status: 404 })
  }
}

export function picturePath(request: Request): Promise<Response> | Response {
  const decodedUrl = decodeURIComponent(request.url.replace(/^picture-path:\/\//i, '/'))

  if (decodedUrl.includes('..')) {
    return new Response('Forbidden', { status: 403 })
  }

  const fullPath = process.platform === 'win32' ? convertPath(decodedUrl) : decodedUrl

  if (!isInsideBaseDir(TEMP_DIR, fullPath)) {
    return new Response('Forbidden', { status: 403 })
  }

  return net.fetch(`file://${fullPath}`)
}

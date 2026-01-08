import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { basename, extname, join, resolve } from 'node:path'
import { TEMP_DIR } from '../shared/constants'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { Readable } from 'node:stream'

const app = new Hono()

app
  .get('/', (c) => c.text('Hello world!'))
  .get('/image', async (c) => {
    const filePath = c.req.query('path')
    if (!filePath) return c.text('Missing path', 400)

    try {
      const fileName = basename(decodeURIComponent(filePath))

      const finalPath = resolve(join(TEMP_DIR, fileName))

      if (!finalPath.startsWith(resolve(TEMP_DIR))) {
        return c.text('Invalid path', 403)
      }

      if (!existsSync(finalPath)) {
        return c.text('Image not found', 404)
      }

      const stat = statSync(finalPath)

      const ext = extname(finalPath).toLowerCase()
      const mimeTypes: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
      }
      const contentType = mimeTypes[ext] || 'application/octet-stream'

      const nodeStream = createReadStream(finalPath)
      const webStream = Readable.toWeb(nodeStream)

      return new Response(webStream as ReadableStream, {
        headers: {
          'Content-Length': stat.size.toString(),
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000' // Opcional: cache
        }
      })
    } catch (error) {
      console.error('Error serving image:', error)
      return c.text('Internal server error', 500)
    }
  })

export function startMediaServer(port = 8080) {
  serve({ fetch: app.fetch, port })
}

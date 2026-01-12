import sharp from 'sharp'
import { Elysia, file, status, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { node } from '@elysiajs/node'
import { existsSync } from 'fs'
import { join, normalize } from 'path'
import { PLAYLIST_DIR, TEMP_DIR } from '../shared/directories'
import { ensureDir } from 'fs-extra'
import { parseFile } from 'music-metadata'
import { getTitle } from './utils/get-title'
import { SERVER_PORT, DEFAULT_METADATA, DEFAULT_URL_IMG, FRONTEND_HOST } from '../shared/constants'

export function startMediaServer() {
  console.log(`🦊 Elysia listening on http://localhost:${SERVER_PORT}`)

  return new Elysia({ adapter: node() })
    .use(cors({ origin: FRONTEND_HOST, methods: '*' }))
    .get('/', () => ({ hello: '👋 from Elysia in Electron!' }))
    .get(
      '/cover',
      async ({ query }) => {
        const { filePath } = query

        const fileName = getTitle(filePath)
        const safePath = normalize(join(filePath))

        if (!safePath.startsWith(PLAYLIST_DIR)) {
          return status(403, DEFAULT_URL_IMG)
        }

        const tempCoverPath = join(TEMP_DIR, `cover-${fileName}.webp`)

        if (!existsSync(tempCoverPath)) {
          const metadata = await parseFile(safePath)

          if (!metadata.common.picture?.length) {
            return status(400, DEFAULT_URL_IMG)
          }

          await ensureDir(TEMP_DIR)

          await sharp(metadata.common.picture[0].data)
            .resize(512, 512, { fit: 'cover', position: 'center' })
            .webp({ quality: 90 })
            .toFile(tempCoverPath)
        }

        return file(tempCoverPath)
      },
      {
        query: t.Object({
          filePath: t.String({
            description: 'File path',
            error: 'Please provide a valid file path here'
          })
        })
      }
    )
    .get(
      '/song',
      async ({ query }) => {
        const { filePath } = query

        const safePath = normalize(join(filePath))

        if (!safePath.startsWith(PLAYLIST_DIR)) {
          return status(403, 'Forbidden')
        }

        return file(safePath)
      },
      {
        query: t.Object({
          filePath: t.String({
            description: 'File path',
            error: 'Please provide a valid file path here'
          })
        })
      }
    )
    .get(
      '/metadata',
      async ({ query }) => {
        const { filePath } = query

        const safePath = normalize(join(filePath))

        if (!safePath.startsWith(PLAYLIST_DIR)) {
          return status(403, DEFAULT_METADATA)
        }

        const metadata = await parseFile(safePath)

        if (!metadata.common) {
          return status(400, DEFAULT_METADATA)
        }

        return status(200, {
          artist: metadata.common.artist ?? 'Unknow Artist',
          album: metadata.common.album ?? 'Unknow Album',
          duration: metadata.format.duration ?? 0
        })
      },
      {
        query: t.Object({
          filePath: t.String({
            description: 'File path',
            error: 'Please provide a valid file path here'
          })
        })
      }
    )
    .listen(SERVER_PORT)
}

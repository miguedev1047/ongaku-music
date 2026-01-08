import { type GetSongImageModel } from '../../shared/models'

import { join } from 'node:path'
import { resolve } from 'node:path'
import { TEMP_DIR } from '../../shared/constants'
import { mkdir, writeFile } from 'node:fs/promises'

import fs from 'fs-extra'

export async function getSongImage(props: GetSongImageModel): Promise<string | null> {
  const { base64String, format, title } = props

  const extension = format.split('/')[1] || 'png'
  const filename = `cover-${title}.${extension}`
  const imagePath = join(TEMP_DIR, filename)
  const resolvePath = resolve(TEMP_DIR, filename)

  try {
    if (!fs.existsSync(TEMP_DIR)) {
      await mkdir(TEMP_DIR, { recursive: true })
    }

    if (!fs.existsSync(imagePath)) {
      const buffer = Buffer.from(base64String, 'base64')
      await writeFile(resolvePath, buffer)
    }

    return resolvePath
  } catch (error) {
    console.error('Error saving image:', error)
    return null
  }
}

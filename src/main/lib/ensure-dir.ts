import fs from 'fs-extra'
import { APP_DIR } from '../../shared/directories'

export async function ensureAppDir(): Promise<void> {
  try {
    await fs.ensureDir(APP_DIR)
  } catch (error) {
    throw new Error(`Failed to ensure app directory at "${APP_DIR}": ${(error as Error).message}`)
  }
}

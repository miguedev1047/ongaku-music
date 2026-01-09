import { execSync } from 'node:child_process'
import { COMMON_PATHS } from '../../shared/constants'

export function findBinary(name: string): string | null {
  try {
    const path = execSync(`which ${name}`, { encoding: 'utf8' })
    const finalPath = path.trim()
    return finalPath || null
  } catch {
    return null
  }
}

function findBinaryFallback(name: string): string | null {
  for (const dir of COMMON_PATHS) {
    const full = `${dir}/${name}`
    try {
      execSync(`${full} --version`, { stdio: 'ignore' })
      return full
    } catch {}
  }
  return null
}

export function detectBinary(name: string): string | null {
  const fallback = findBinaryFallback(name)
  return findBinary(name ?? fallback)
}

import { execSync } from 'node:child_process'
// import { COMMON_PATHS } from '../../shared/constants'

const isWindows = process.platform === 'win32'

export function findBinary(name: string): string | null {
  try {
    const command = isWindows ? ['where.exe', name] : ['which', name]

    const output = execSync(command.join(' '), {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore']
    })

    const firstPath = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean)

    return firstPath ?? null
  } catch {
    return null
  }
}

// function findBinaryFallback(name: string): string | null {
//   for (const dir of COMMON_PATHS) {
//     const full = `${dir}/${name}`
//     try {
//       execSync(`${full} --version`, { stdio: 'ignore' })
//       return full
//     } catch {}
//   }
//   return null
// }

export function detectBinary(name: string): string | null {
  return findBinary(name)
}

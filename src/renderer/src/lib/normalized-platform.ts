export function normalizePlatform(platform: string): 'windows' | 'linux' | 'macos' {
  const lower = platform.toLowerCase()
  if (lower.includes('win')) return 'windows'
  if (lower.includes('darwin') || lower.includes('mac')) return 'macos'
  if (lower.includes('linux')) return 'linux'
  return 'windows'
}

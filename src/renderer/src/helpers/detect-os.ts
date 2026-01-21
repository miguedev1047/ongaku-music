type OS = 'windows' | 'linux' | 'macos'

export function detectOS(): OS {
  if (typeof window === 'undefined') return 'windows'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'macos'
  if (ua.includes('linux')) return 'linux'
  return 'windows'
}

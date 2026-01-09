interface Props {
  option: 'only-song' | 'only-playlist' | string
  url: string
}

export function getFinalUrl(props: Props): string {
  const { option, url } = props
  const normalUrl = url.split('&').slice(0, 1).join('')
  const playlistUrl = url.split('&').slice(0, 2).join('&')
  if (option === 'only-song') return normalUrl
  if (option === 'only-playlist') return playlistUrl
  return normalUrl
}

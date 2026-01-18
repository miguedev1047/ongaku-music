type DownloadPhase = 'downloading' | 'processing'

export function getStatusText(phase: DownloadPhase, isPlaylist: boolean): string {
  if (phase === 'processing') {
    return isPlaylist ? 'Processing Playlist Song:' : 'Processing song:'
  }
  return isPlaylist ? 'Downloading Playlist Song:' : 'Downloading song:'
}

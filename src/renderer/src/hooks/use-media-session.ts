import { useEffect } from 'react'
import { useMediaNextSong, useMediaPlay, useMediaPrevSong } from '@/hooks/use-media-player'
import { useMediaStore } from '@/stores/media-store'
import { DEFAULT_URL_IMG } from '@shared/constants'

export function useMediaSession() {
  const { handleTogglePlay } = useMediaPlay()
  const { handleNextSong } = useMediaNextSong()
  const { handlePrevSong } = useMediaPrevSong()

  const currentSong = useMediaStore((s) => s.currentSong)
  const mediaRef = useMediaStore((s) => s.ref)
  const setCurrentTime = useMediaStore((s) => s.setCurrentTime)
  const isPlaying = useMediaStore((s) => s.isPlaying)

  // 🎵 Metadata
  useEffect(() => {
    if (!currentSong || !('mediaSession' in navigator)) return

    const artworkSrc = currentSong.picture || DEFAULT_URL_IMG

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.title,
      artist: currentSong.metadata?.artist || 'Unknown Artist',
      album: currentSong.metadata?.album || 'Unknown Album',
      artwork: [
        { src: artworkSrc, sizes: '96x96' },
        { src: artworkSrc, sizes: '128x128' },
        { src: artworkSrc, sizes: '512x512' }
      ]
    })

    return () => {
      navigator.mediaSession.metadata = null
    }
  }, [currentSong])

  // ⏯ Actions
  useEffect(() => {
    if (!('mediaSession' in navigator)) return

    navigator.mediaSession.setActionHandler('play', handleTogglePlay)
    navigator.mediaSession.setActionHandler('pause', handleTogglePlay)

    navigator.mediaSession.setActionHandler('nexttrack', handleNextSong)
    navigator.mediaSession.setActionHandler('previoustrack', handlePrevSong)

    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (!details.seekTime || !mediaRef) return
      mediaRef.currentTime = details.seekTime
      setCurrentTime(details.seekTime)
    })

    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      if (!mediaRef) return
      const offset = details.seekOffset ?? 10
      mediaRef.currentTime += offset
      setCurrentTime(mediaRef.currentTime)
    })

    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      if (!mediaRef) return
      const offset = details.seekOffset ?? 10
      mediaRef.currentTime -= offset
      setCurrentTime(mediaRef.currentTime)
    })
  }, [handleTogglePlay, handleNextSong, handlePrevSong, mediaRef, setCurrentTime])

  // ▶️ Playback state
  useEffect(() => {
    if (!('mediaSession' in navigator)) return
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
  }, [isPlaying])
}

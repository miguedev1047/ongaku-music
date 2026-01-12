import { useMediaElement, useMediaShortcuts } from '@/hooks/use-media-player'
import { useMediaSession } from '@/hooks/use-media-session'
import { getAudioUrl } from '@shared/helpers'

export function MediaElement() {
  useMediaShortcuts()

  useMediaSession()

  const {
    currentSong,
    handleEnded,
    handleError,
    handleLoad,
    handleLoadedMetadata,
    handleTimeUpdate,
    setMediaRef
  } = useMediaElement()

  if (!currentSong) return

  return (
    <audio
      ref={(el) => setMediaRef(el as HTMLAudioElement)}
      src={getAudioUrl(currentSong.path)}
      className="sr-only"
      onLoadedMetadata={handleLoadedMetadata}
      onPlay={handleLoad}
      onEnded={handleEnded}
      onError={handleError}
      onTimeUpdate={handleTimeUpdate}
      autoPlay
    />
  )
}

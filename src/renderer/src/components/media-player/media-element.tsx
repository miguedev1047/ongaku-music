import { useMediaElement, useMediaShortcuts } from '@/hooks/use-media-player'

export function MediaElement() {
  useMediaShortcuts()

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
      src={currentSong.src}
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

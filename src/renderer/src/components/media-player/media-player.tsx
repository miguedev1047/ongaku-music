import {
  MediaElement,
  MediaNextSong,
  MediaPlay,
  MediaPrevSong,
  MediaProgressbar,
  MediaSongInfo,
  MediaLoop,
  MediaShuffle,
  MediaVolmen
} from '@/components/media-player/_index'
import { useMediaStore } from '@/stores/media-store'
import { Suspense } from 'react'
import { MediaPlayerButtonSkeleton } from '@/components/skeletons'
import { useMediaSession } from '@/hooks/use-media-session'
import { useMediaShortcuts } from '@/hooks/use-media-player'

export function MediaPlayer() {
  useMediaShortcuts()
  useMediaSession()

  const currentSong = useMediaStore((state) => state.currentSong)
  if (!currentSong) return

  return (
    <footer className="absolute bottom-0 inset-x-0 w-full h-(--footer-height) bg-background z-10 flex items-center gap-20 px-4">
      <MediaProgressbar />

      <MediaSongInfo />

      <div className="flex items-center gap-1">
        <Suspense fallback={<MediaPlayerButtonSkeleton />}>
          <MediaPrevSong />
        </Suspense>
        <Suspense fallback={<MediaPlayerButtonSkeleton />}>
          <MediaPlay />
        </Suspense>
        <Suspense fallback={<MediaPlayerButtonSkeleton />}>
          <MediaNextSong />
        </Suspense>
      </div>

      <div className="flex flex-1 grow basis-0 justify-end gap-1">
        <MediaLoop />
        <MediaShuffle />
        <MediaVolmen />
      </div>

      <Suspense>
        <MediaElement />
      </Suspense>
    </footer>
  )
}

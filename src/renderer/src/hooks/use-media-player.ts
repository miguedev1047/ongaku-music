import { playlistSongsQueryOpts } from '@/queries/playlists-queries'
import { useMediaStore } from '@/stores/media-store'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'
import { useEffect, useState } from 'react'
import { useRecentSongsStore } from '@/stores/recent-songs-store'

type MediaEvent = React.SyntheticEvent<HTMLAudioElement>

export function useMediaProgressbar() {
  const [seekTime, setSeekTime] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)

  const mediaRef = useMediaStore((state) => state.ref)
  const currentTime = useMediaStore((state) => state.currentTime)
  const duration = useMediaStore((state) => state.duration)

  const setCurrentTime = useMediaStore((state) => state.setCurrentTime)

  useEffect(() => {
    if (isSeeking) return
    setSeekTime(currentTime)
  }, [currentTime, isSeeking])

  const onValueChange = (value: number[]) => {
    if (!mediaRef) return
    mediaRef.muted = true
    setIsSeeking(true)
    setSeekTime(value[0])
  }

  const handleValueCommit = (value: number[]) => {
    if (!mediaRef) return
    mediaRef.currentTime = value[0]
    setCurrentTime(value[0])
    setIsSeeking(false)
    mediaRef.muted = false
  }

  return {
    seekTime,
    duration,
    onValueChange,
    handleValueCommit,
    isDisabled: !mediaRef
  }
}

export function useMediaLoop() {
  const mediaRef = useMediaStore((state) => state.ref)
  const isIdle = useMediaStore((state) => state.state === 'idle')
  const isLoop = useMediaStore((state) => state.isLoop)
  const isShuffle = useMediaStore((state) => state.isShuffle)
  const setLoop = useMediaStore((state) => state.setLoop)
  const setShuffle = useMediaStore((state) => state.setShuffle)

  const handleToggleLoop = () => {
    if (!mediaRef) return
    setLoop(!isLoop)
    if (isShuffle) setShuffle(false)
    mediaRef.loop = !isLoop
  }

  return {
    isIdle,
    isLoop,
    handleToggleLoop
  }
}

export function useMediaShuffle() {
  const mediaRef = useMediaStore((state) => state.ref)
  const isIdle = useMediaStore((state) => state.state === 'idle')
  const isLoop = useMediaStore((state) => state.isLoop)
  const isShuffle = useMediaStore((state) => state.isShuffle)
  const setShuffle = useMediaStore((state) => state.setShuffle)
  const setLoop = useMediaStore((state) => state.setLoop)

  const handleToggleShuffle = () => {
    if (!mediaRef) return
    setShuffle(!isShuffle)
    if (isLoop) setLoop(false)
    mediaRef.loop = false
  }

  return {
    isIdle,
    isShuffle,
    handleToggleShuffle
  }
}

export function useMediaNextSong() {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  const currentSong = useMediaStore((state) => state.currentSong)
  const playlist = useMediaStore((state) => state.playlist)
  const setSong = useMediaStore((state) => state.setSong)
  const isShuffle = useMediaStore((state) => state.isShuffle)
  const pushRecentSong = useRecentSongsStore((state) => state.pushRecentSong)

  const { data } = useSuspenseQuery(playlistSongsQueryOpts(playlist))

  const handleNextSong = () => {
    if (!data || !currentSong) return

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * data.length)
      const randomSong = data[randomIndex]
      setSong(randomSong)
      pushRecentSong(randomSong)
      return
    }

    const currentIndex = data.findIndex((song) => song.title === currentSong.title)
    const nextIndex = (currentIndex + 1) % data.length

    const nextSong = data[nextIndex]
    setSong(nextSong)
    pushRecentSong(nextSong)
  }

  return { currentSong, handleNextSong, isIdle }
}

export function useMediaPrevSong() {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  const currentSong = useMediaStore((state) => state.currentSong)
  const playlist = useMediaStore((state) => state.playlist)
  const setSong = useMediaStore((state) => state.setSong)
  const isShuffle = useMediaStore((state) => state.isShuffle)
  const pushRecentSong = useRecentSongsStore((state) => state.pushRecentSong)

  const { data } = useSuspenseQuery(playlistSongsQueryOpts(playlist))

  const handlePrevSong = () => {
    if (!data || !currentSong) return

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * data.length)
      const randomSong = data[randomIndex]
      setSong(randomSong)
      pushRecentSong(randomSong)
      return
    }

    const currentIndex = data.findIndex((song) => song.title === currentSong.title)
    const prevIndex = (currentIndex - 1 + data.length) % data.length
    const prevSong = data[prevIndex]

    setSong(prevSong)
    pushRecentSong(prevSong)
  }

  return { currentSong, handlePrevSong, isIdle }
}

export function useMediaPlay() {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  const mediaRef = useMediaStore((state) => state.ref)

  const isPlaying = useMediaStore((state) => state.isPlaying)
  const togglePlay = useMediaStore((state) => state.togglePlay)

  const handleTogglePlay = () => {
    if (!mediaRef) return
    isPlaying ? mediaRef.pause() : mediaRef.play()
    togglePlay()
  }

  return { isIdle, isPlaying, handleTogglePlay }
}

export function useMediaElement() {
  const currentSong = useMediaStore((state) => state.currentSong)
  const mediaRef = useMediaStore((state) => state.ref)
  const setMediaRef = useMediaStore((state) => state.setMediaRef)
  const volumen = useMediaStore((state) => state.volumen)
  const isLoop = useMediaStore((state) => state.isLoop)
  const setDuration = useMediaStore((state) => state.setDuration)
  const setCurrentTime = useMediaStore((state) => state.setCurrentTime)
  const setPlay = useMediaStore((state) => state.setPlay)
  const setState = useMediaStore((state) => state.setState)

  const { handleNextSong } = useMediaNextSong()

  useEffect(() => {
    if (!mediaRef) return
    mediaRef.volume = volumen / 100
    mediaRef.loop = isLoop
  }, [mediaRef, volumen, isLoop])

  useEffect(() => {
    return () => setMediaRef(null)
  }, [setMediaRef])

  const handleEnded = () => {
    handleNextSong()
  }

  const handleLoadedMetadata = (e: MediaEvent) => {
    setDuration(e.currentTarget.duration)
  }

  const handleTimeUpdate = (e: MediaEvent) => {
    setCurrentTime(e.currentTarget.currentTime)
  }

  const handleLoad = () => {
    setState('loaded')
    setPlay(true)
  }

  const handleError = () => {
    setState('error')
  }

  return {
    currentSong,
    mediaRef,
    setMediaRef,
    handleEnded,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleLoad,
    handleError
  }
}

export function useMediaShortcuts() {
  const mediaLoop = useMediaLoop()
  const mediaShuffle = useMediaShuffle()
  const mediaPlay = useMediaPlay()
  const mediaPrevSong = useMediaPrevSong()
  const mediaNextSong = useMediaNextSong()

  useKeyboardShortcut({
    combo: { code: 'ArrowLeft' },
    handler: mediaPrevSong.handlePrevSong
  })
  useKeyboardShortcut({
    combo: { code: 'ArrowRight' },
    handler: mediaNextSong.handleNextSong
  })
  useKeyboardShortcut({
    combo: { code: 'KeyS' },
    handler: mediaShuffle.handleToggleShuffle
  })
  useKeyboardShortcut({
    combo: { code: 'KeyL' },
    handler: mediaLoop.handleToggleLoop
  })
  useKeyboardShortcut({
    combo: { code: 'Space' },
    handler: mediaPlay.handleTogglePlay
  })

  return null
}

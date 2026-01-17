import { useDownloadStore } from '@/stores/download-store'
import { useEffect } from 'react'

export function useDownloadProgressListener() {
  const setProgress = useDownloadStore((s) => s.setProgress)
  const setInfoSong = useDownloadStore((s) => s.setInfoSong)

  useEffect(() => {
    const unsuscribe = window.api.onDownloadSongProgress((data) => {
      setProgress(data.progress)
      setInfoSong(data.info)
    })
    return unsuscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

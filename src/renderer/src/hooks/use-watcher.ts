import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useWatcher() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const unsuscribe = window.api.onUpdatedPlaylist((data) => {
      if (data.type === 'playlist') {
        queryClient.invalidateQueries({ queryKey: ['playlists'] })
      }

      if (data.type === 'song') {
        queryClient.invalidateQueries({ queryKey: ['playlist', data.playlist] })
      }
    })
    return unsuscribe
  }, [queryClient])
}

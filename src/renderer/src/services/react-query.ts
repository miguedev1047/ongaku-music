import { QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

function isNetworkError(error: unknown) {
  return error instanceof TypeError
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.silent) return
      const message = isNetworkError(error)
        ? 'Network error. Check your connection.'
        : 'Something went wrong'

      toast.error(message, {
        description: query.queryKey.join(' · '),
        action: {
          label: 'Retry',
          onClick: () => {
            queryClient.invalidateQueries({
              queryKey: query.queryKey
            })
          }
        }
      })
    }
  }),

  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 min
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})

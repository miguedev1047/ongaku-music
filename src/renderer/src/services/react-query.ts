import { QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      toast.error('An ocurred a error', {
        action: {
          label: 'Retry',
          onClick: () => {
            queryClient.invalidateQueries()
          }
        }
      })
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 15
    }
  }
})

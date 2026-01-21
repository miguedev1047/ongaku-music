import { DetectDependenciesModel } from '@shared/models'
import { queryOptions } from '@tanstack/react-query'

export const detectDependenciesQuery = queryOptions<DetectDependenciesModel>({
  queryKey: ['detect-dependencies'],
  queryFn: async () => await window.api.detectDependencies(),
  staleTime: 15000,
  retry: 2
})

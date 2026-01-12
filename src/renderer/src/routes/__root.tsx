import { Providers } from '@/components/shared/provider'
import { TanstackDevtools } from '@/components/shared/tanstack-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { NotFound } from '@/components/router/not-found'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootLayout,
  notFoundComponent: NotFound
})

function RootLayout() {
  return (
    <Providers>
      <Outlet />
      <Toaster position="top-center" />
      <Suspense>
        <TanstackDevtools />
      </Suspense>
    </Providers>
  )
}

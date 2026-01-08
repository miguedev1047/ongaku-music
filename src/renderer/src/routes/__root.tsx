import { Providers } from '@/components/shared/provider'
import { TanstackDevtools } from '@/components/shared/tanstack-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootLayout,
  notFoundComponent: () => {
    return <div>Not found</div>
  }
})

function RootLayout() {
  return (
    <Providers>
      <Outlet />
      <Toaster />
      <Suspense>
        <TanstackDevtools />
      </Suspense>
    </Providers>
  )
}

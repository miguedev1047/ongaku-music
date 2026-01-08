import { queryClient } from '@/services/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/shared/theme-provider'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

import FuzzyText from '@/components/FuzzyText'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader, AppSidebarLeft, AppSidebarRight } from '@/components/app-sidebar/_index'
import { Spinner } from '@/components/ui/spinner'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { MediaPlayer } from '@/components/media-player/media-player'
import { useDownloadProgressListener } from '@/hooks/use-download-progress-listener'

export const Route = createFileRoute('/_indexLayout')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(playlistQueryOpts)
  },
  pendingComponent: () => {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="size-8" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    )
  },
  errorComponent: () => {
    return (
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-4">
        <FuzzyText>Error</FuzzyText>
        <FuzzyText>404</FuzzyText>
      </div>
    )
  }
})

function RouteComponent() {
  useDownloadProgressListener()
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 60)',
            '--footer-height': 'calc(var(--spacing) * 25)'
          } as React.CSSProperties
        }
        className="flex flex-col"
      >
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebarLeft />
          <SidebarInset>
            <main className="flex flex-1 flex-col p-4 max-w-280 w-full mx-auto @container/main">
              <Outlet />
            </main>
          </SidebarInset>
          <AppSidebarRight />
        </div>
        <MediaPlayer />
      </SidebarProvider>
    </div>
  )
}

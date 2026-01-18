import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader, AppSidebarLeft, AppSidebarRight } from '@/components/app-sidebar/_index'
import { playlistQueryOpts } from '@/queries/playlists-queries'
import { MediaPlayer } from '@/components/media-player/media-player'
import { useDownloadProgressListener } from '@/hooks/use-download-progress-listener'
import { useWatcher } from '@/hooks/use-watcher'
import { useMediaStore } from '@/stores/media-store'
import { cn } from '@/lib/utils'
import { LoadingLayout } from '@/components/router/loading'
import { ErrorLayout } from '@/components/router/error'

export const Route = createFileRoute('/_indexLayout')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(playlistQueryOpts)
  },
  pendingComponent: LoadingLayout,
  errorComponent: ErrorLayout
})

function RouteComponent() {
  const isIdle = useMediaStore((state) => state.state === 'idle')

  useDownloadProgressListener()
  useWatcher()

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 70)',
            '--footer-height': 'calc(var(--spacing) * 25)'
          } as React.CSSProperties
        }
        className="flex flex-col"
      >
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebarLeft />
          <SidebarInset
            data-idle={isIdle}
            className={cn(
              'data-[idle=false]:h-[calc(100svh-var(--footer-height)-4.4rem)] data-[idle=true]:h-[calc(100%-5.5rem)] overflow-y-auto'
            )}
          >
            <main className="flex flex-1 flex-col p-4 max-w-300 w-full mx-auto @container/main">
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

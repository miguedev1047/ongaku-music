import { DownloadInfo } from '@/components/shared/download-info'
import { SongListSkeleton } from '@/components/skeletons'
import { SongList, SongListHeader } from '@/components/songs/_index'
import { Spinner } from '@/components/ui/spinner'
import { playlistSongsQueryOpts } from '@/queries/playlists-queries'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_indexLayout/playlist/$title')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(playlistSongsQueryOpts(params.title))
    return params
  }
})

function RouteComponent() {
  return (
    <section className="w-full h-full flex flex-col gap-4 overflow-y-auto px-1">
      <DownloadInfo />

      <Suspense fallback={<Spinner />}>
        <SongListHeader />
      </Suspense>

      <Suspense fallback={<SongListSkeleton />}>
        <SongList />
      </Suspense>
    </section>
  )
}

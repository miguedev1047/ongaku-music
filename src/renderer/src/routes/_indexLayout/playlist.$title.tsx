import { DownloadInfo } from '@/components/shared/download-info'
import { SectionContainer } from '@/components/shared/section-container'
import { SongListHeaderSkeleton, SongListSkeleton } from '@/components/skeletons'
import { SongList, SongListHeader } from '@/components/songs/_index'
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
    <SectionContainer>
      <DownloadInfo />

      <Suspense fallback={<SongListHeaderSkeleton />}>
        <SongListHeader />
      </Suspense>

      <Suspense fallback={<SongListSkeleton />}>
        <SongList />
      </Suspense>
    </SectionContainer>
  )
}

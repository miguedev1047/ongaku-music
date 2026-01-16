import { SectionContainer } from '@/components/shared/section-container'
import { SongListSkeleton } from '@/components/skeletons'
import { SongList } from '@/components/songs/_index'
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
  const { title } = Route.useLoaderData()

  return (
    <SectionContainer>
      <h2 className="font-bold uppercase text-xl">{title}</h2>
      <Suspense fallback={<SongListSkeleton />}>
        <SongList />
      </Suspense>
    </SectionContainer>
  )
}

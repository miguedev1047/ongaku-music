import { createFileRoute } from '@tanstack/react-router'
import { RecentSongsList } from '@/components/recent-songs/recent-song-list'
import { SectionContainer } from '@/components/shared/secition-container'
import { DownloadInfo } from '@/components/shared/download-info'

export const Route = createFileRoute('/_indexLayout/')({
  component: Index
})

function Index() {
  return (
    <SectionContainer>
      <DownloadInfo />

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recently Played</h2>
        <RecentSongsList />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        {/* TODO: Add quick actions */}
      </div>
    </SectionContainer>
  )
}

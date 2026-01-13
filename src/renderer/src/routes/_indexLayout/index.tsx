import { createFileRoute } from '@tanstack/react-router'
import { RecentSongsList } from '@/components/recent-songs/recent-song-list'
import { SectionContainer } from '@/components/shared/section-container'
import { DownloadInfo } from '@/components/shared/download-info'
import { QuickActionList } from '@/components/quick-actions/quick-action-list'

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
        <QuickActionList />
      </div>
    </SectionContainer>
  )
}

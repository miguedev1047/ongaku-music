import { DownloadAlert } from '@/components/download/download-alert'
import { DownloadForm } from '@/components/forms/download-form'
import { SectionContainer } from '@/components/shared/section-container'
import { DownloadAlertSkeleton, DownloadFormSkeleton } from '@/components/skeletons'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_indexLayout/download')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <SectionContainer>
      <Suspense fallback={<DownloadAlertSkeleton />}>
        <DownloadAlert />
      </Suspense>
      <Suspense fallback={<DownloadFormSkeleton />}>
        <DownloadForm />
      </Suspense>
    </SectionContainer>
  )
}

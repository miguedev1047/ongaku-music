import { DownloadForm } from '@/components/forms/download-form'
import { DownloadFormSkeleton } from '@/components/skeletons'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/_indexLayout/download')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <Suspense fallback={<DownloadFormSkeleton />}>
        <DownloadForm />
      </Suspense>
    </section>
  )
}

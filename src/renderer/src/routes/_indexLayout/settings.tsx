import { SectionContainer } from '@/components/shared/section-container'
import { createFileRoute } from '@tanstack/react-router'
import { Settings } from '@/components/settings/_index'

export const Route = createFileRoute('/_indexLayout/settings')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <SectionContainer>
      <h2 className="text-xl font-bold">Settings</h2>
      <Settings />
    </SectionContainer>
  )
}

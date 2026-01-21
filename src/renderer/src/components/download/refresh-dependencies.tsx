import { RefreshCcwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSuspenseQuery } from '@tanstack/react-query'
import { detectDependenciesQuery } from '@/queries/detect-depdencies-queries'
import { useTransition } from 'react'

export function RefreshDependencies() {
  const { refetch } = useSuspenseQuery(detectDependenciesQuery)
  const [isPending, startTransition] = useTransition()

  const handleRefresh = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      refetch()
    })
  }

  return (
    <Button disabled={isPending} size="icon" onClick={handleRefresh}>
      <RefreshCcwIcon data-pending={isPending} className="data-[pending=true]:animate-spin" />
    </Button>
  )
}

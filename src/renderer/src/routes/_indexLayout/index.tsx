import FuzzyText from '@/components/FuzzyText'

import { cn } from '@/lib/utils'
import { useMediaStore } from '@/stores/media-store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_indexLayout/')({
  component: Index
})

function Index() {
  const isIdle = useMediaStore((state) => state.state === 'idle')

  return (
    <div
      data-idle={isIdle}
      className={cn(
        'w-full h-full justify-center items-center flex',
        'data-[idle=false]:h-[calc(100%-var(--footer-height)-2.5rem)] data-[idle=true]:h-full'
      )}
    >
      <div className="">
        <FuzzyText fontSize="clamp(1rem, 6vw, 6rem)">Welcome to</FuzzyText>
        <FuzzyText fontSize="clamp(1rem, 6vw, 6rem)">Ongaku MUsic</FuzzyText>
      </div>
    </div>
  )
}

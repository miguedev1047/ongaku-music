import { cn } from '@/lib/utils'
import { useMediaStore } from '@/stores/media-store'

export function SectionContainer({ className, ...props }: React.ComponentProps<'section'>) {
  const isIdle = useMediaStore((state) => state.state === 'idle')
  return (
    <section
      {...props}
      data-idle={isIdle}
      className={cn(
        'w-full h-full flex flex-col gap-8 overflow-y-auto px-1',
        'data-[idle=false]:h-[calc(100%-var(--footer-height)-2.5rem)] data-[idle=true]:h-full',
        className
      )}
    />
  )
}

import { cn } from '@/lib/utils'

export function SectionContainer({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      {...props}
      className={cn('w-full h-full flex flex-col gap-8 overflow-y-auto px-1', className)}
    />
  )
}

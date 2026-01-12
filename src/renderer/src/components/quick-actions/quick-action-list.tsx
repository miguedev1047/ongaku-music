import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useQuickActions } from '@/hooks/use-quick-actions'

export function QuickActionList() {
  const { quickActions: actions } = useQuickActions()

  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3')}>
      {actions.map((action) => {
        const Icon = action.icon

        return (
          <Button
            key={action.title}
            variant="secondary"
            onClick={action.onAction}
            className="flex h-40 flex-col items-center gap-2 py-4 text-xs font-medium hover:scale-102"
          >
            <Icon className="h-8 w-8" />
            <span className="text-center text-sm md:text-xl leading-tight">{action.title}</span>
          </Button>
        )
      })}
    </div>
  )
}

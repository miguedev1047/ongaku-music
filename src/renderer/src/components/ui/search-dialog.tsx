import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { VList } from 'virtua'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Kbd } from '@/components/ui/kbd'
import { CornerDownLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchDialogProps<T> {
  open: boolean
  onOpenChange: () => void

  title: string
  description?: string
  placeholder?: string
  heading?: string

  items: T[]
  getKey: (item: T) => string

  /** SLOT */
  renderItem: (item: T, onSelect: () => void) => React.ReactElement

  onSelect: (item: T) => void
}

export function SearchDialog<T>({
  open,
  onOpenChange,
  title,
  description,
  placeholder = 'Search...',
  heading = 'Results',
  items,
  getKey,
  renderItem,
  onSelect
}: SearchDialogProps<T>) {
  const [value, setValue] = useState('')

  const filteredItems = items.filter((item) =>
    getKey(item).toLowerCase().includes(value.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-lg border-none bg-clip-padding p-2 pb-11 shadow-xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Command className="rounded-none bg-transparent **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input]:py-0">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />

          <CommandList className="flex-!">
            <CommandGroup
              heading={heading}
              className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-2!"
            >
              <VList data={filteredItems} className="no-scrollbar w-full h-full! min-h-80">
                {(item) => renderItem(item, () => onSelect(item))}
              </VList>
            </CommandGroup>
          </CommandList>
        </Command>

        <div className="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center justify-between gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 font-medium text-muted-foreground text-xs dark:border-t-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-1">
            <Kbd>
              <CornerDownLeft aria-hidden="true" className="size-3" />
            </Kbd>
            Select
          </div>

          <div className="flex items-center gap-1">
            <Kbd>Esc</Kbd>
            Close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface SearchDialogItemProps extends React.ComponentProps<typeof CommandItem> {}

export function SearchDialogItem({ className, ...props }: SearchDialogItemProps) {
  return (
    <CommandItem
      className={cn(
        'px-3! h-9 rounded-md border border-transparent font-medium hover:border-input hover:bg-input/50',
        className
      )}
      {...props}
    />
  )
}

import { ModeToggle } from '@/components/ui/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { SearchSong } from '@/components/searchs/_index'
import { SearchSongSkeleton } from '@/components/skeletons'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { MusicIcon } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="bg-background flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex flex-1 grow basis-0 items-center gap-1">
          <Button variant="ghost" asChild>
            <Link to="/">
              <MusicIcon />
              Ongaku Music
            </Link>
          </Button>
          <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
          <SidebarTrigger className="-ml-1" />
        </div>

        <Suspense fallback={<SearchSongSkeleton />}>
          <SearchSong />
        </Suspense>

        <div className="ml-auto flex flex-1 grow basis-0 justify-end items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

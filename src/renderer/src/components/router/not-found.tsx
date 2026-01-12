import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@tanstack/react-router'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFound() {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="text-muted-foreground">This section doesn’t exist or was moved.</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/">
            <Home className="mr-2 size-4" />
            Home
          </Link>
        </Button>

        <Button variant="ghost" onClick={() => router.history.back()}>
          <ArrowLeft className="mr-2 size-4" />
          Go back
        </Button>
      </div>
    </div>
  )
}

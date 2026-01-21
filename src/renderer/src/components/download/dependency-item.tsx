import { CheckCircle2, XCircle } from 'lucide-react'
import { Badge } from '../ui/badge'

interface DependencyItemProps {
  name: string
  isInstalled: boolean
}

export function DependencyItem({ name, isInstalled }: DependencyItemProps) {
  return (
    <Badge
      data-installed={isInstalled}
      className="inline-flex items-center gap-1.5 data-[installed=true]:bg-green-500 data-[installed=false]:bg-red-500"
    >
      {isInstalled ? <CheckCircle2 /> : <XCircle />}
      <span>{name}</span>
    </Badge>
  )
}

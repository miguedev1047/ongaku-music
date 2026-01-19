import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useDownloadStore } from '@/stores/download-store'
import { Link } from '@tanstack/react-router'
import { CloudDownload } from 'lucide-react'

export function DownloadMedia() {
  const isActiveDownload = useDownloadStore((state) => state.isDownloading)

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to="/download"
          preload="intent"
          activeProps={{ className: 'bg-sidebar-accent' }}
          data-downloading={isActiveDownload}
          className="data-[downloading=true]:text-green-500 transition-colors duration-250 ease-in-out data-[downloading=true]:*:animate-pulse"
        >
          <CloudDownload />
          <span>Download Media</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

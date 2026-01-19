import {
  AppHome,
  DownloadMedia,
  NewPlaylist,
  SearchPlaylist
} from '@/components/app-sidebar/nav-main/_index'

export function NavMain() {
  return (
    <>
      <NewPlaylist />
      <SearchPlaylist />
      <AppHome />
      <DownloadMedia />
    </>
  )
}

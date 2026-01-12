export function getTitle(filePath: string) {
  return (
    filePath
      .split('/')
      .at(-1)
      ?.toString()
      .replace(/\.[^/.]+$/, '') ?? ''
  )
}

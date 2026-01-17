import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_URL_IMG } from '@shared/constants'

interface CoverImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
  src?: string | null
}

export function CoverImage({ className, src, ...props }: CoverImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [image, setImage] = useState(src ?? DEFAULT_URL_IMG)
  const [_, setError] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setError(false)
    setImage(src ?? DEFAULT_URL_IMG)
  }, [src])

  const onLoadImage = () => {
    setLoaded(true)
  }

  const onErrorImage = () => {
    setError(true)
    setImage(DEFAULT_URL_IMG)
  }

  return (
    <>
      {!loaded && <Skeleton className="size-full absolute inset-0" />}
      <img
        onLoad={onLoadImage}
        onError={onErrorImage}
        className={cn(
          'size-full object-cover transition-opacity',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        src={image}
        {...props}
      />
    </>
  )
}

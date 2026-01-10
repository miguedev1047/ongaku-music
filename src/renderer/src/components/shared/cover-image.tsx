import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_URL_IMG } from '@/constants/general'

interface CoverImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
  src?: string | null
}

export function CoverImage({ className, src, ...props }: CoverImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [image, setImage] = useState(DEFAULT_URL_IMG)

  const onLoadImage = () => {
    setLoaded(true)
    setImage(src!)
  }
  return (
    <>
      {!loaded && <Skeleton className="size-full" />}
      <img
        key={src}
        onLoad={onLoadImage}
        className={cn(
          'size-full object-cover transition-transform',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        src={image}
        {...props}
      />
    </>
  )
}

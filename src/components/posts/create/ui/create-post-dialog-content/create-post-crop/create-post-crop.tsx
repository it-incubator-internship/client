import { useRef, useState } from 'react'

import { useAppSelector } from '@/services/store'
import Image from 'next/image'

import s from './create-post-crop.module.scss'

export const CreatePostCrop = () => {
  const images = useAppSelector(state => state.createPost.images)

  const cropperRef = useRef<HTMLImageElement>(null)
  const [imageSrc, setImageSrc] = useState<null | string>(null)

  console.log('images', images)

  const imgStyle = {
    height: 503,
    width: 490,
  }

  return (
    <div className={s['create-post-cropp-wrapper']}>
      {images.length && (
        <Image
          alt={'image to crop'}
          className={s['create-post-cropp-image']}
          height={imgStyle.height}
          src={images[0].img}
          width={imgStyle.width}
        />
      )}
    </div>
  )
}

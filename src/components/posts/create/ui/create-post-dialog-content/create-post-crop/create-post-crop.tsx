import { useRef, useState } from 'react'

import { useAppSelector } from '@/services/store'
import { Button, ExpandOutline, ImageOutline, MaximizeOutline } from '@robur_/ui-kit'
import clsx from 'clsx'
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
      <div className={s['create-post-cropp-action-buttons']}>
        <div className={s['create-post-cropp-btns-block']}>
          <Button
            className={clsx(s['create-post-cropp-btn'], s['create-post-cropp-btn-fullscreen'])}
            onClick={() => {}}
            variant={'secondary'}
          >
            <ExpandOutline />
          </Button>
          <Button
            className={clsx(s['create-post-cropp-btn'], s['create-post-cropp-btn-zoom'])}
            onClick={() => {}}
            variant={'secondary'}
          >
            <MaximizeOutline />
          </Button>
        </div>
        <Button
          className={clsx(s['create-post-cropp-btn'], s['create-post-cropp-btn-add-change-photo'])}
          onClick={() => {}}
          variant={'secondary'}
        >
          <ImageOutline />
        </Button>
      </div>
    </div>
  )
}

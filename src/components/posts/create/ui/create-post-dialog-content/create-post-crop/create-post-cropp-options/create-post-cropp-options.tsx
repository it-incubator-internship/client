import React, { ReactNode } from 'react'

import AspectRatio1to1 from '@/assets/AspectRatio1to1'
import AspectRatio4to5 from '@/assets/AspectRatio4to5'
import AspectRatio16to9 from '@/assets/AspectRatio16to9'
import ImageOutline from '@/assets/ImageOutline'
import { Button } from '@robur_/ui-kit'
import clsx from 'clsx'
import { nanoid } from 'nanoid'

import s from './create-post-cropp-options.module.scss'

type OptionsProps = {
  children: ReactNode
  className?: string
}

type OptionsArrayProps = {
  button: React.JSX.Element
  id: string
  name: string
  onClick?: () => void
}

export const optionsArray: OptionsArrayProps[] = [
  {
    button: (
      <Button variant={'ghost'}>
        <ImageOutline />
      </Button>
    ),
    id: nanoid(),
    name: 'Оригинал',
  },
  {
    button: (
      <Button variant={'ghost'}>
        <AspectRatio1to1 />
      </Button>
    ),
    id: nanoid(),
    name: '1:1',
  },
  {
    button: (
      <Button variant={'ghost'}>
        <AspectRatio4to5 />
      </Button>
    ),
    id: nanoid(),
    name: '4:5',
  },
  {
    button: (
      <Button variant={'ghost'}>
        <AspectRatio16to9 />
      </Button>
    ),
    id: nanoid(),
    name: '16:9',
  },
]

export function CreatePostCroppOptions({ children, className }: OptionsProps) {
  return <div className={clsx(s.createPostCroppOptions, className)}>{children}</div>
}

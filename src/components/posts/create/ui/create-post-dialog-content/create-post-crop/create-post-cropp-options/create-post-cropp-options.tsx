import React, { Fragment, ReactNode } from 'react'

import { randomUUID } from 'node:crypto'

import { Button, ImageOutline } from '@robur_/ui-kit'
import clsx from 'clsx'

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
    id: randomUUID(),
    name: 'Оригинал',
  },
  {
    button: (
      <Button variant={'ghost'}>
        <ImageOutline />
      </Button>
    ),
    id: randomUUID(),
    name: '1:1',
  },
  {
    button: (
      <Button variant={'ghost'}>
        <ImageOutline />
      </Button>
    ),
    id: randomUUID(),
    name: '4:5',
  },
  {
    button: (
      <Button variant={'ghost'}>
        <ImageOutline />
      </Button>
    ),
    id: randomUUID(),
    name: '16:9',
  },
]

export function CreatePostCroppOptions({ children, className }: OptionsProps) {
  return <div className={clsx(s.createPostCroppOptions, className)}>{children}</div>
}

import React, { ReactNode } from 'react'

import { Card } from '@robur_/ui-kit'

import s from './SelectionGroup.module.scss'

interface SelectionGroupProps {
  children: ReactNode
  title: string
}

export const SelectionGroup: React.FC<SelectionGroupProps> = ({ children, title }) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <Card className={s.containerCard}>{children}</Card>
    </div>
  )
}

import React from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import s from './SidebarItem.module.scss'

type Props = {
  Icon: React.ElementType
  disabled?: boolean
  href: string
  item: string
}
export const SidebarItem = ({ Icon, disabled, href, item }: Props) => {
  const disabledClasses = disabled ? s.TagDisabled : ''

  return (
    <Link className={clsx(s.Tag, disabledClasses)} href={href}>
      <Icon aria-hidden={'true'} className={s.Svg} />
      <span className={s.A}>{item}</span>
    </Link>
  )
}

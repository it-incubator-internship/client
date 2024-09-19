import React, { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import s from './SidebarItem.module.scss'

export type SidebarItemProps<T extends ElementType = typeof Link> = {
  Icon: React.ElementType
  as?: T
  disabled?: boolean
  href: string
  item: string
} & ComponentPropsWithoutRef<T>

export const SidebarItem = <T extends ElementType = typeof Link>(props: SidebarItemProps<T>) => {
  const { Icon, as: Component = Link, disabled, href, item, ...rest } = props
  const disabledClasses = disabled ? s.TagDisabled : ''

  return (
    <Component className={clsx(s.Tag, disabledClasses)} href={href} {...rest}>
      <Icon aria-hidden={'true'} className={s.Svg} />
      <span className={s.A}>{item}</span>
    </Component>
  )
}

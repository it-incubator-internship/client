import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import s from './SidebarItem.module.scss'

export type SidebarItemProps<T extends ElementType = typeof Link> = {
  Icon: React.ElementType
  as?: T
  children: ReactNode
  disabled?: boolean
  href: string
} & ComponentPropsWithoutRef<T>

export const SidebarItem = <T extends ElementType = typeof Link>(props: SidebarItemProps<T>) => {
  const { Icon, as: Component = Link, children, disabled, href, item, ...rest } = props
  const disabledClasses = disabled ? s.TagDisabled : ''

  return (
    <Component className={clsx(s.Tag, disabledClasses)} href={href} {...rest}>
      <Icon aria-hidden={'true'} className={s.Svg} />
      {children}
    </Component>
  )
}

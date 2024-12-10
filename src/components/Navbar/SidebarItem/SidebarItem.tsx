import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

  const router = useRouter()
  const currentPageName = '/' + router.asPath.split('/')[1]
  const itemHref = '/' + href.split('/')[1]
  const isSelected = currentPageName === itemHref ? true : false

  const disabledClasses = disabled ? s.TagDisabled : ''

  return (
    <Component
      className={clsx(s.Tag, disabledClasses, isSelected && s.selectedTag)}
      href={href}
      {...rest}
    >
      <Icon aria-hidden={'true'} className={s.Svg} />
      {children}
    </Component>
  )
}

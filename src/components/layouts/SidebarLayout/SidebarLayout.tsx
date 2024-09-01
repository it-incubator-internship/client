import { PropsWithChildren, ReactElement } from 'react'

import { Navbar } from '@/components/Navbar/Navbar'
import { NextPage } from 'next'

import s from './SidebarLayout.module.scss'

const SidebarLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <main className={s.main}>
      <Navbar className={s.navbar} />
      {children}
    </main>
  )
}

export const getSideBarLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

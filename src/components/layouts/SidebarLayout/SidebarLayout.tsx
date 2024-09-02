import { PropsWithChildren, ReactElement } from 'react'

import { Navbar } from '@/components/Navbar/Navbar'
import { getMainLayout } from '@/components/layouts/MainLayout/MainLayout'
import { NextPage } from 'next'

import s from './SidebarLayout.module.scss'

const SidebarLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const WrappedComponent = getMainLayout(children)

  return (
    <main className={s.main}>
      <Navbar className={s.navbar} />
      {WrappedComponent}
    </main>
  )
}

export const getSideBarLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

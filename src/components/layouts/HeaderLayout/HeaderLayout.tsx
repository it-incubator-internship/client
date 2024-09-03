import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components/Header/Header'
import { getMainLayout } from '@/components/layouts/MainLayout/MainLayout'
import { NextPage } from 'next'

import s from './HeaderLayout.module.scss'

const HeaderLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const WrappedComponent = getMainLayout(children)

  return (
    <main className={s.main}>
      <Header />
      <div className={s.container}>{WrappedComponent}</div>
    </main>
  )
}

export const getHeaderLayout = (page: ReactElement) => {
  return <HeaderLayout>{page}</HeaderLayout>
}

import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components/Header/Header'
import { Navbar } from '@/components/Navbar/Navbar'
import { getMainLayout } from '@/components/layouts/MainLayout/MainLayout'
import { useMeQuery } from '@/services/auth/authApi'
import { NextPage } from 'next'

import s from './CombinedLayout.module.scss'

const CombinedLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const WrappedComponent = getMainLayout(children)
  const { data } = useMeQuery()

  return (
    <main className={s.main}>
      <Header />
      {data && <Navbar className={s.navbar} />}
      <div className={s.container}>{WrappedComponent}</div>
    </main>
  )
}

export const getCombinedLayout = (page: ReactElement) => {
  return <CombinedLayout>{page}</CombinedLayout>
}

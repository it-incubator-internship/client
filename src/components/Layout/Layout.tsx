import React, { PropsWithChildren, ReactElement } from 'react'

import { Navbar } from '@/components/Navbar/Navbar'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <main className={s.main}>
      <Navbar className={s.navbar} />
      {children}
    </main>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

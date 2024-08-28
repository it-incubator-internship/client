import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './HeaderLayout.module.scss'

const HeaderLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <main className={s.main}>
      <header>HEADER</header>
      <div className={s.container}>{children}</div>
    </main>
  )
}

export const getHeaderLayout = (page: ReactElement) => {
  return <HeaderLayout>{page}</HeaderLayout>
}

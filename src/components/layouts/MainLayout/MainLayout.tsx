import { PropsWithChildren, ReactNode } from 'react'

import { HeadMeta } from '@/components/HeadMeta/HeadMeta'
import { NextPage } from 'next'

const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'Navaibe'} />
      {children}
    </>
  )
}

export const getMainLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}

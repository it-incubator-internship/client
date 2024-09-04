import { PropsWithChildren, ReactElement, ReactNode } from 'react'

import { HeadMeta } from '@/components/HeadMeta/HeadMeta'
import { NextPage } from 'next'

const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'Inctagram'} />
      {children}
    </>
  )
}

export const getMainLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}

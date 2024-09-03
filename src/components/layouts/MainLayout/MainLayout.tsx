import { PropsWithChildren, ReactElement, ReactNode } from 'react'

import { HeadMeta } from '@/components/HeadMeta/HeadMeta'
import Spinner from '@/components/Spinner/Spinner'
import { useAppSelector } from '@/services/store'
import { NextPage } from 'next'

const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const isInit = useAppSelector(state => state.appReducer.isInitialized)

  if (!isInit) {
    return <Spinner />
  }

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

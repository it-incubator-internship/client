import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type { ReactElement, ReactNode } from 'react'
import { Provider, useSelector } from 'react-redux'

import { AuthProvider } from '@/components/AuthProvider/AuthProvider'
import { store, useAppDispatch, useAppSelector } from '@/services/store'
import { useLoader } from '@/assets/hooks/useLoader'
import { store } from '@/services/store'

import '@/styles/index.scss'
import '@/styles/nprogress.scss'
import '@robur_/ui-kit/style.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </Provider>
  )
}

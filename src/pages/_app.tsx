import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@/components/AuthProvider/AuthProvider'
import { useLoader } from '@/hooks/useLoader'
import { wrapper } from '@/services/store'

import '@/styles/index.scss'
import '@/styles/nprogress.scss'
import '@/styles/toastStyles.scss'
import '@robur_/ui-kit/style.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/cropper.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)

  useLoader()
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer />
        {getLayout(<Component {...props.pageProps} />)}
      </AuthProvider>
    </Provider>
  )
}

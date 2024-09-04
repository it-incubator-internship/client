import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type { ReactElement, ReactNode } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Provider } from 'react-redux'

import { useLoader } from '@/assets/hooks/useLoader'
import { AuthProvider } from '@/components/AuthProvider/AuthProvider'
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
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}>
      <Provider store={store}>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </Provider>
    </GoogleReCaptchaProvider>
  )
}

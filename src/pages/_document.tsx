import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head>
        <script async src={'https://www.google.com/recaptcha/api.js'}></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

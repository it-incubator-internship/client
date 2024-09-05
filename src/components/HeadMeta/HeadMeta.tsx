import { useTranslation } from '@/hooks/useTranslation'
import Head from 'next/head'

type PropsTypeHead = {
  description?: string
  title: string
}

export const HeadMeta = (props: PropsTypeHead) => {
  const { description, title } = props
  const t = useTranslation()

  return (
    <Head>
      <title>{title}</title>
      <meta content={description || t.meta.defaultDescriptionText} name={'description'} />
      <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
      <link href={'/favicon.ico'} rel={'icon'} />
    </Head>
  )
}

import { en, ru } from '@/locales'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const router = useRouter()

  return router.locale === 'en' ? en : ru
}

import { en, ru } from '@/locales'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const router = useRouter()
  const savedLocale = localStorage.getItem('currentLocale')

  if (!savedLocale) {
    return router.locale === 'en' ? en : ru
  } else {
    const parsedLocale = JSON.parse(savedLocale)

    return parsedLocale === 'en' ? en : ru
  }
}

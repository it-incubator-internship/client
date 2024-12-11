import { LocaleType } from '@/locales/ru'
import { AuthError, ErrorType, FieldError } from '@/utils/types/errorTypes'

type Props = {
  error: unknown
  setError: any
  specificField?: null | string
  translations: LocaleType
}
export const customErrorHandler = <T>({
  error,
  setError,
  specificField = null,
  translations,
}: Props) => {
  const errors = (error as ErrorType<T>).data?.fields

  if (errors) {
    errors.forEach((error: FieldError<T>) => {
      setError(error.field, {
        message: error.message,
        type: 'manual',
      })
    })
  } else if (error) {
    let errorMessage

    if (error instanceof Error) {
      errorMessage = `Native error: ${error.message}`
    } else if ((error as AuthError)?.data) {
      errorMessage = translations.errors['401']
      // errorMessage = (error as AuthError)?.data?.error
    }

    if (specificField) {
      setError(specificField, {
        message: errorMessage,
        type: 'manual',
      })
    }
  }
}

import { LocaleType } from '@/locales/ru'
import { AuthError, ErrorType, FieldError } from '@/utils/types/errorTypes'

type Props = {
  error: unknown
  setError: any
  specificField?: null | string
  translations: LocaleType
}
/*
{
    "statusCode": 400,
    "inTry": "HttpException",
    "error": "Validation failed (uuid is expected)",
    "errorObj": null,
    "info": "Check your request! /ᐠ-ꞈ-ᐟ\\"
}
 */
export const customErrorHandler = <T>({
  error,
  setError,
  specificField = null,
  translations,
}: Props) => {
  const errors = (error as ErrorType<T>).data?.fields
console.log('error custom', error)
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
      // const responseData = (error as AuthError)?.data
      // switch (responseData?.statusCode) {
      //   case 400: errorMessage = translations.errors.
      // }
      console.log('error: ', error)
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

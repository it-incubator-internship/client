import { AuthError, ErrorType, FieldError } from '@/utils/types/errorTypes'

type Props = {
  error: unknown
  setError: any
  specificField?: null | string
}

export const customErrorHandler = <T>({ error, setError, specificField = null }: Props) => {
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
      errorMessage = (error as AuthError)?.data?.error
    }
    // else {
    //   errorMessage = JSON.stringify(error)
    // }

    if (specificField) {
      setError(specificField, {
        message: errorMessage,
        type: 'manual',
      })
    }
  }
}

export type FieldError<T> = {
  field: T
  message: string
}

export type ErrorType<T> = {
  data: {
    fields: FieldError<T>[]
  }
  message: string
}

export type AuthError = {
  data: {
    error: string
    info: string
    statusCode: number
  }
}

export type ErrorEditPost = {
  error: string
  errorObj: null
  inTry: string
  info: string
  statusCode: number
}

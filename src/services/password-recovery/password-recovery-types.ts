export type ChangePasswordArgs = {
  code: string
  newPassword: string
  passwordConfirmation: string
}

export type CheckEmailArgs = {
  email: string
  recaptchaToken: string
}
export type CheckEmailResponse = {
  email: string
}
export type ResendEmailArgs = {
  email: string
}
export type ResendEmailResponse = {
  email: string
}
export type ServerError = {
  data: {
    fields: [
      {
        field: string
        message: string
      },
    ]
    message: string
    path: string
    status: number
    timestamp: string
  }
}

export type CheckCodeArgs = string

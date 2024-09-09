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

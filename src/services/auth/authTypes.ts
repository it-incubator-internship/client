export type RegistrationArgs = {
  email: string,
  password: string,
  passwordConfirmation: string,
  userName: string,
  isAgreement: boolean
}
export type RegistrationResponse = {
  email: string
}
export type LoginArgs = {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string
}
export type MeResponse = {
  email: string
  userId: string
  userName: string
}
export type RegistrationConfirmationArgs = {
  code: string
}
export type RegistrationResendingArgs = {
  email: string
}

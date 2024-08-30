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
}

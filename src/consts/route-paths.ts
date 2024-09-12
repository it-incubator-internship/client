// pages

export const PATH = {
  AUTH: '/authentication',
  CREATE_NEW_PASSWORD: '/create-new-password',
  EMAIL_CONFIRMED: '/email-confirmed',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  LINK_EXPIRED: '/link-expired',
  LOGIN: '/sign-in',
  PROFILE_EDIT: '/profile/edit',
  REGISTRATION: '/sign-up',
}

export const commonRoutes = [
  PATH.HOME,
  PATH.LOGIN,
  PATH.REGISTRATION,
  PATH.FORGOT_PASSWORD,
  PATH.CREATE_NEW_PASSWORD,
  PATH.LINK_EXPIRED,
  PATH.AUTH,
  PATH.EMAIL_CONFIRMED,
]

export const privateRoutes = [PATH.PROFILE_EDIT]

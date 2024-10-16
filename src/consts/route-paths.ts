// pages

export const PATH = {
  AUTH: '/authentication',
  BOOKMARKS: '/bookmarks',
  CREATE: '/create',
  CREATE_NEW_PASSWORD: '/create-new-password',
  EMAIL_CONFIRMED: '/email-confirmed',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  LINK_EXPIRED: '/link-expired',
  LIST: '/list',
  LOGIN: '/sign-in',
  MESSAGES: '/messages',
  NOT_FOUND: '/404',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile-settings',
  REGISTRATION: '/sign-up',
  SEARCH: '/search',
  STATISTICS: '/statistics',
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
  PATH.LIST,
  PATH.NOT_FOUND,
  PATH.PROFILE,
]

export const privateRoutes = [PATH.PROFILE_EDIT]

import { LocaleType } from '@/locales/ru'
import { pluralizeEn } from '@/utils/createPluralize'

export const en: LocaleType = {
  and: 'and',
  auth: {
    EmailSent: 'Email sent',
    agreeTo: 'I agree to the',
    email: 'Email',
    forgotPassword: 'Forgot Password',
    goToSignIn: 'Go to sign in',
    haveAccount: 'Do you have an account?',
    noAccount: 'Don’t have an account?',
    password: 'Password',
    passwordConfirmation: 'Password confirmation',
    policy: 'Privacy Policy',
    sentConfirmationLink(responseEmail: string) {
      return `We have sent a link to confirm your email to ${responseEmail}`
    },
    signIn: 'Sign in',
    signUp: 'Sign Up',
    terms: 'Terms of Service',
    username: 'Username',
  },
  createNewPassword: {
    newPasswordForm: {
      button: 'Create new password',
      inputConfirmPassLabel: 'Password confirmation',
      inputNewPassLabel: 'New password',
      modal: {
        buttonTitle: 'OK',
        subtitle: 'The password has been successfully changed.',
      },
      subTitle: 'Your password must be between 6 and 20 characters',
      title: 'New Password',
    },
    passwordLinkExpired: {
      button: 'Email verification link expired',
      modal: {
        buttonTitle: 'OK',
        subtitle: 'We have sent a link to confirm your email to ',
        throttleSubtitleEnd: ' seconds before trying to send the link again.',
        throttleSubtitleStart: 'Please wait ',
        title: 'Email sent',
      },
      subtitle:
        'Looks like the verification link has expired. Not to worry, we can send the link again',
      title: 'Resend link',
    },
  },
  createPost: {
    addPhotoDescription: 'Click here and add new Photo',
    addPhotoTitle: 'Add Photo',
    cropDescription: 'lick here and crop new Photo',
    cropTitle: 'Cropping',
    filterDescription: 'lick here and filter new Photo',
    filterTitle: 'Filters',
    openDraft: 'Open draft',
    publishDescription: 'lick here and publish new Photo',
    publishTitle: 'Publication',
    selectFromComputer: 'Select from computer',
  },
  devices: {
    activeSessions: 'Active sessions',
    currentDevice: 'Current device',
    logOut: 'Log out',
    terminateOtherSessions: 'Terminate all other session',
  },
  english: 'English',
  errors: {
    401: 'Incorrect login or password',
    default: 'Something went wrong',
    fetch_error: 'Some problems with your connection',
  },
  forgotPassword: {
    buttonBack: 'Back to Sign In',
    buttonSendInitial: 'Send link',
    buttonSendSuccess: 'Send Link Again',
    inputLabel: 'Email',
    modal: {
      buttonTitle: 'OK',
      subtitle: 'We have sent a link to confirm your email to ',
      throttleSubtitleEnd: ' seconds before trying to send the link again.',
      throttleSubtitleStart: 'Please wait ',
      title: 'Email sent',
    },
    recaptchaLabel: 'I’m not a robot',
    subtitleInitial: 'Enter your email address and we will send you further instructions',
    subtitleSuccess:
      'The link has been sent by email. If you don’t receive an email send link again',
    title: 'Forgot password',
  },
  formErrors: {
    email: 'The email must match the format\nexample@example.com',
    maxLength(count: number) {
      const str = pluralizeEn(count)

      switch (str) {
        case 'one':
          return `Field must be ${count} character long at least`
        case 'few':
          return `Field must be ${count} characters long at least`
        case 'many':
          return `Field must be ${count} characters long at least`
      }
    },
    passwordMatch: 'Password should match',
    passwordRegex:
      'password can contain a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _ ` { | } ~',
    required: 'This field is required',
    termsAgreement: 'Please, mark the checkbox, if you agree to our terms',
  },
  meta: {
    defaultDescriptionText:
      'The Inctagram social network is a limitless communication of people all over the world',
  },
  myProfile: {
    followers: 'Followers',
    following: 'Following',
    initialUrlProfile: 'UrlProfile',
    publications: 'Publications',
  },
  nav: {
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    logout: 'Logout',
    messenger: 'Messenger',
    myProfile: 'My profile',
    search: 'Search',
    statistics: 'Statistics',
  },
  russian: 'Russian',
  signUp: {
    and: 'and',
    confirmPassword: 'Password confirmation',
    email: 'Email',
    haveAccount: 'Do you have an account?',
    isAgreement: 'I agree to the ',
    password: 'Password',
    privacyPolicy: 'Privacy Policy',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    termsOfServices: 'Terms of Service',
    userName: 'Username',
  },
}

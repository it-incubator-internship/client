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
    addPublicationTitle: 'Add post description',
    cropDescription: 'Click here and crop new Photo',
    cropTitle: 'Cropping',
    cropping: {
      original: 'Original',
    },
    errorFileSize:
      'The selected file exceeds the maximum allowed size of 10MB. Please choose a smaller file.',
    errorFileType: 'The selected file type is not supported. Please upload a PNG or JPEG image.',
    errorMaxPhotos: 'You can upload a maximum of 5 photos.',
    filterDescription: 'Click here and filter new Photo',
    filterTitle: 'Filters',
    openDraft: 'Open draft',
    postDescriptionError: 'Post description must be 500 symbols length or less',
    publishDescription: 'Click here and publish new Photo',
    publishTitle: 'Publication',
    selectFromComputer: 'Select from computer',
    titleButtonDiscardDraft: 'Discard',
    titleButtonSaveDraft: 'Save',
    titleFromAlertChangeVersion: 'Database was updated in another tab. Please reload the page.',
    titleHeaderModalDiscardDraft: 'Close',
    titleModalSavedDraft:
      'Do you really want to close the creation of a publication? If you close everything will be deleted.',
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
    anUnexpectedErrorHasOccurredServer:
      'An unexpected error has occurred on the server. Please wait, it will be fixed soon.',
    default: 'Something went wrong',
    fetch_error: 'Some problems with your connection',
    homePage: 'home page.',
    oopsInternalServerError: 'OOPS! INTERNAL SERVER ERROR',
    oopsPageNotFound: 'OOPS! PAGE NOT FOUND',
    tryToReturnToThe: 'Try to return to the',
    youCanReturnToThe: 'You can return to the',
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
    firstNameMustContainOnlyLettersAZaz: 'First name must contain only letters A-Z, a-z, А-Я, а-я',
    firstnameNoMoreThan50Characters: 'This field firstname must be no more than 50 characters',
    invalidEmail: 'Invalid email',
    lastNameMustContainOnlyLettersAZaz: 'Last name must contain only letters A-Z, a-z, А-Я, а-я',
    lastnameNoMoreThan50Characters: 'This field last name must be no more than 50 characters',
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
    noMoreThan200Characters: 'This field about me must be no more than 200 characters',
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
    profileSettings: 'Profile settings',
    publications: 'Publications',
  },
  myProfileSettings: {
    aUserUnder13CannotCreateProfile: 'A user under 13 cannot create a profile.',
    aboutMe: 'About me',
    accountManagement: 'Account management',
    addProfilePhoto: 'Add a profile photo',
    clickHereAddProfilePhoto: 'Click here add profile photo',
    dateOfBirth: 'Date of birth',
    devices: 'Devices',
    error: 'Error',
    errorServerIsNotAvailable: 'Error! Server is not available!',
    firstName: 'First name',
    generalInformation: 'General information',
    lastName: 'Last name',
    myPayments: 'My payments',
    privacyPolicy: 'Privacy Policy',
    profileSaved: 'Profile saved',
    save: 'Save',
    saveChanges: 'Save changes',
    selectFromComputer: 'Select from computer',
    selectYourCity: 'Select your city',
    selectYourCountry: 'Select your city',
    userName: 'User name',
    yourSettingsAreSaved: 'Your settings are saved!',
  },
  nav: {
    areYouWantToLogOut: 'Are you really want to log out of your account',
    create: 'Create',
    favorites: 'Favorites',
    home: 'Home',
    logout: 'Logout',
    messenger: 'Messenger',
    myProfile: 'My profile',
    no: 'No',
    search: 'Search',
    statistics: 'Statistics',
    yes: 'Yes',
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

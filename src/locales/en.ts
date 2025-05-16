// eslint-disable-next-line import/namespace
import { LocaleType } from '@/locales/ru'
import { pluralizeEn, pluralizeRu } from '@/utils/createPluralize'

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
    sentConfirmationLink: 'We have sent a link to confirm your email to:',
    signIn: 'Sign in',
    signUp: 'Sign Up',
    terms: 'Terms of Service',
    username: 'Username',
  },
  createNewPassword: {
    newPasswordForm: {
      button: 'Create new password',
      errors: {
        passwordMaxCharacters: 'Password must be no more than 20 characters',
        passwordMinCharacters: 'Password must be at least 6 characters',
        passwordsMustMatch: 'Passwords must match',
      },
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
    postCreated: 'Post has been created successfully. It will appear in your profile soon',
    postDeleted: 'The post was successfully deleted.',
    postDescriptionError: 'Post description must be 500 symbols length or less',
    postNotCreated: 'Something went wrong, new post has not been created',
    postNotDeleted: 'Something went wrong. The post has not been deleted.',
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
  dateTexts: {
    daysAgo(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `${count} day ago`
        case 'few':
          return `${count} days ago`
        case 'many':
          return `${count} days ago`
      }
    },
    hoursAgo(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `${count} hour ago`
        case 'few':
          return `${count} hours ago`
        case 'many':
          return `${count} hours ago`
      }
    },
    minAgo(count: number) {
      const str = pluralizeRu(count)

      console.log('str', str)

      switch (str) {
        case 'one':
          return `${count} min ago`
        case 'few':
          return `${count} min ago`
        case 'many':
          return `${count} min ago`
      }
    },
  },
  devices: {
    activeSessions: 'Active sessions',
    currentDevice: 'Current device',
    logOut: 'Log out',
    terminateOtherSessions: 'Terminate all other session',
  },
  emailConfirmed: {
    buttonText: 'Sign In',
    text: 'Your email has been confirmed',
    title: 'Congratulations!',
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
    minLength: 'Minimum number of characters 6',
    noMoreThan200Characters: 'This field about me must be no more than 200 characters',
    notValidEmail: 'Not valid email',
    passwordMatch: 'Password should match',
    passwordRegex:
      'Password can contain a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _ ` { | } ~',
    required: 'This field is required',
    termsAgreement: 'Please, mark the checkbox, if you agree to our terms',
    userName: 'User name must contain only letters A-Z, a-z, 0-9',
  },
  meta: {
    defaultDescriptionText:
      'The Inctagram social network is a limitless communication of people all over the world',
    readOnlyNotification:
      'View mode. To access full functionality, please fill out and save the required fields in your profile settings.',
  },
  myProfile: {
    addComment: 'Add a Comment...',
    answer: 'Answer',
    followers: 'Followers',
    following: 'Following',
    initialUrlProfile: 'UrlProfile',
    like: 'Like',
    postModalTitle: 'Post view',
    profileSettings: 'Profile settings',
    publications: 'Publications',
    publish: 'Publish',
    time: 'Hours ago',
  },
  myProfileAvatar: {
    deleteDialog: {
      buttonRejectionTitle: 'No',
      buttonTitle: 'Yes',
      text: 'Do you really want to delete your profile photo?',
    },
    saveAvatarServerError:
      'Unable to upload the avatar. If the issue persists, please contact our support team.',
  },
  myProfileSettings: {
    aUserUnder13CannotCreateProfile: 'A user under 13 cannot create a profile.',
    aboutMe: 'About me',
    accountManagement: 'Account management',
    accountManagementPayment: {
      accountType: 'Account type:',
      autoRenewal: 'Auto-Renewal',
      currentSubscription: 'Current Subscription:',
      errorSelected: 'A variant must be selected',
      expire: 'Expire at',
      modalCancelSubscription: {
        text: 'Auto-renewal will be disabled. Are you sure?',
        textButton: 'OK',
        title: 'Cancel auto-renewal',
      },
      modalCreatePayment: {
        text: 'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings',
        textButton: 'OK',
        title: 'Create payment',
      },
      modalRequestError: {
        text: 'The transaction failed. Please write to support',
        textButton: 'Back to payment',
        title: 'Error',
      },
      modalRequestSuccess: {
        text: 'Subscription successful!',
        textButton: 'Ок',
        title: 'Success',
      },
      nextPayment: 'Next payment',
      subscriptionCosts: 'Your subscription costs:',
    },
    addProfilePhoto: 'Add a profile photo',
    addProfilePhotoBlocked: 'Add a profile photo is not available in view mode.',
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
    selectYourCountry: 'Select your country',
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
  other: {
    noData: 'There is no any data...',
    showLess: 'Hide',
    showMore: 'Show more',
  },
  post: {
    deletePost: 'Delete Post',
    editPost: 'Edit Post',
    no: 'No',
    sureWantDeletePost: 'Are you sure you want to delete this post?',
    yes: 'Yes',
  },
  postEdition: {
    modalConfirmCloseEditionPost: {
      buttonRejectionTitle: 'No',
      buttonTitle: 'Yes',
      text: 'Do you really want to close the edition of the publication? If you close changes won’t be saved.',
      titleModalWithConfirm: 'Close post',
    },
    publicationSuccessfullyEdited: 'publication successfully edited',
    titleFormEditPost: 'Add a post description',
    titleHeaderModalEditPost: 'Edit post',
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
  verificationLinkExpired: {
    button: 'Resend verification link',
    modal: {
      buttonTitle: 'OK',
      subtitle: 'We have sent a link to confirm your email to ',
      throttleSubtitleEnd: ' seconds before trying to send the link again.',
      throttleSubtitleStart: 'Please wait ',
      title: 'Email sent',
    },
    subtitle:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    title: 'Email verification link expired',
  },
}

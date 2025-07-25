import { AccountManagement } from '@/components/AccountManagement/AccountManagement'
import { pluralizeRu } from '@/utils/createPluralize'

export const ru = {
  and: 'и',
  auth: {
    EmailSent: 'Письмо отправлено',
    agreeTo: 'Я согласен с',
    email: 'Почта',
    forgotPassword: 'Восстановить пароль',
    goToSignIn: 'Перейти на страницу Sign in',
    haveAccount: 'У Вас уже есть аккаунт?',
    noAccount: 'Нет аккаунта?',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    policy: 'Политикой',
    sentConfirmationLink: 'Мы отправили ссылку для подтверждения почты на адрес:',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    terms: 'Правилами',
    username: 'Имя пользователя',
  },
  createNewPassword: {
    newPasswordForm: {
      button: 'Создать новый пароль',
      errors: {
        passwordMaxCharacters: 'Пароль должен быть не более 20 символов',
        passwordMinCharacters: 'Пароль должен быть не менее 6 символов',
        passwordsMustMatch: 'Пароли должны совпадать',
      },
      inputConfirmPassLabel: 'Подтвердите новый пароль',
      inputNewPassLabel: 'Введите новый пароль',
      modal: {
        buttonTitle: 'Хорошо',
        subtitle: 'Пароль успешно изменен.',
      },
      subTitle: 'Длина пароля должна быть от 6 до 20 символов',
      title: 'Новый пароль',
    },
    passwordLinkExpired: {
      button: 'Получить заново',
      modal: {
        buttonTitle: 'Хорошо',
        subtitle: 'Инструкции успешно отправлены на ваш адрес ',
        throttleSubtitleEnd: ' секунд перед следующей попыткой.',
        throttleSubtitleStart: 'Пожалуйста, подождите ',
        title: 'Письмо отправлено',
      },
      subtitle: 'Кажется, прошло слишком много времени и срок действия ссылки истек',
      title: 'Срок действия ссылки истек',
    },
  },
  createPost: {
    addPhotoDescription: 'Нажмите сюда, чтобы добавить новое фото',
    addPhotoTitle: 'Добавить фото',
    addPublicationTitle: 'Добавить описание поста',
    cropDescription: 'Нажмите сюда, чтобы обрезать новое фото',
    cropTitle: 'Обрезать фото',
    cropping: {
      original: 'Оригинал',
    },
    errorFileSize:
      'Выбранный файл превышает максимальный допустимый размер 10МБ. Пожалуйста, выберите файл меньшего размера.',
    errorFileType:
      'Выбранный тип файла не поддерживается. Пожалуйста, загрузите изображение в формате PNG или JPEG.',
    errorMaxPhotos: 'Вы можете загрузить максимум 5 фотографий.',
    filterDescription: 'Нажмите сюда, чтобы добавить фильтры для фото',
    filterTitle: 'Добавить фильтр',
    openDraft: 'Открыть черновик',
    postCreated: 'Пост был удачно создан. Он скоро отобразиться в вашем профиле',
    postDeleted: 'Пост был удачно удалён.',
    postDescriptionError: 'Текст описания поста должен быть не более 500 символов',
    postNotCreated: 'Что-то пошло не так. Пост не был создан',
    postNotDeleted: 'Что-то пошло не так. Пост не был удалён.',
    publishDescription: 'Нажмите сюда, чтобы опубликовать новое фото',
    publishTitle: 'Опубликовать',
    selectFromComputer: 'Выбрать на этом компьютере',
    titleButtonDiscardDraft: 'Закрыть',
    titleButtonSaveDraft: 'Сохранить',
    titleFromAlertChangeVersion:
      'База данных обновлена в другой вкладке. Пожалуйста, перезагрузите страницу.',
    titleHeaderModalDiscardDraft: 'Отказаться',
    titleModalSavedDraft:
      'Вы действительно хотите закрыть создание публикации? Если вы закроете, все будет удалено.',
  },
  dateTexts: {
    daysAgo(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `${count} день назад`
        case 'few':
          return `${count} дня назад`
        case 'many':
          return `${count} дней назад`
      }
    },
    hoursAgo(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `${count} час назад`
        case 'few':
          return `${count} часа назад`
        case 'many':
          return `${count} часов назад`
      }
    },
    minAgo(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `${count} минуту назад`
        case 'few':
          return `${count} минуты назад`
        case 'many':
          return `${count} минут назад`
      }
    },
  },
  devices: {
    activeSessions: 'Активные сессии',
    currentDevice: 'Текущее устройство',
    logOut: 'Выйти',
    terminateOtherSessions: 'Закрыть все сессии кроме текущей',
  },
  emailConfirmed: {
    buttonText: 'Войти',
    text: 'Ваш email успешно подтвержден',
    title: 'Поздравляем!',
  },
  english: 'Английский',
  errors: {
    401: 'Не правильный логин или пароль',
    anUnexpectedErrorHasOccurredServer:
      'На сервере произошла непредвиденная ошибка. Пожалуйста, подождите, она будет исправлена в ближайшее время.',
    default: 'Что-то пошло не так',
    fetch_error: 'Проблемы с Вашим интернет соединением',
    homePage: 'домашнюю страницу.',
    oopsInternalServerError: 'УПС! ВНУТРЕННЯЯ ОШИБКА СЕРВЕРА',
    oopsPageNotFound: 'УПС! СТРАНИЦА НЕ НАЙДЕНА',
    tryToReturnToThe: 'Try to return to the',
    youCanReturnToThe: 'Попытайтесь вернуться на',
  },
  forgotPassword: {
    buttonBack: 'Вернуться на страницу входа',
    buttonSendInitial: 'Отправить',
    buttonSendSuccess: 'Отправить заново',
    inputLabel: 'Электронная почта',
    modal: {
      buttonTitle: 'Хорошо',
      subtitle: 'Инструкции успешно отправлены на ваш адрес ',
      throttleSubtitleEnd: ' секунд перед следующей попыткой.',
      throttleSubtitleStart: 'Пожалуйста, подождите ',
      title: 'Письмо отправлено',
    },
    recaptchaLabel: 'Я не робот',
    subtitleInitial: 'Укажите электронную почту для получения дальнейших инструкций',
    subtitleSuccess:
      'Письмо с инструкциями было отправлено на указанный адрес. Если вы не получили его, нажмите "Отправить заново"',
    title: 'Восстановление пароля',
  },
  formErrors: {
    email: 'Поле email должно соответствовать формату\nexample@example.com',
    firstNameMustContainOnlyLettersAZaz: 'Имя должно состоять только из букв А-Я, a-z, A-Я, a-я',
    firstnameNoMoreThan50Characters: 'Длина имени в этом поле не должна превышать 50 символов',
    invalidEmail: 'Неверный адрес электронной почты',
    lastNameMustContainOnlyLettersAZaz: 'Фамилия должна состоять только из букв А-Я, a-z, A-Я, a-я',
    lastnameNoMoreThan50Characters: 'Длина фамилии в этом поле не должна превышать 50 символов',
    maxLength(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `Поле должно быть не более чем ${count} знак`
        case 'few':
          return `Поле должно быть не более ${count} знака`
        case 'many':
          return `Поле должно быть не более ${count} знаков`
      }
    },
    minLength: 'Минимальное количество символов 6',
    noMoreThan200Characters: 'Это поле "Обо мне" должно содержать не более 200 символов',
    notValidEmail: 'Недействительный адрес электронной почты',
    passwordMatch: 'Пароли должны совпадать',
    passwordRegex:
      'Пароль может содержать символы: a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _ ` { | } ~',
    required: 'Поле обязательно',
    termsAgreement: 'Пожалуйста, поставьте галочку, что Вы согласны с нашими правилами',
    userName: 'Имя пользователя должно содержать только буквы A-Z, a-z, 0-9.',
  },
  meta: {
    defaultDescriptionText:
      'Социальная сеть The Inctagram это безлимитная коммуникация людей по всему миру',
    readOnlyNotification:
      'Режим просмотра. Для перехода к полной функциональности заполните и сохраните обязательные поля в настройках профиля.',
  },
  myProfile: {
    addComment: 'Добавить комментарий...',
    answer: 'Ответить',
    followers: 'Подписчики',
    following: 'Подписки',
    initialUrlProfile: 'Url пользователя',
    like: 'Нравится',
    postModalTitle: 'Просмотр поста',
    profileSettings: 'Настройки профиля',
    publications: 'Публикации',
    publish: 'Опубликовать',
    time: 'Часов назад',
  },
  myProfileAvatar: {
    deleteDialog: {
      buttonRejectionTitle: 'Нет',
      buttonTitle: 'Да',
      text: 'Вы действительно хотите удалить фото профиля?',
    },
    saveAvatarServerError:
      'Не удалось загрузить аватарку. Если проблема повторяется, пожалуйста, свяжитесь с нашей службой поддержки',
  },
  myProfileSettings: {
    aUserUnder13CannotCreateProfile: 'Пользователь младше 13 лет не может создать профиль.',
    aboutMe: 'Обо мне',
    accountManagement: 'Управление учетными записями',
    accountManagementPayment: {
      accountType: 'Тип аккаунта:',
      autoRenewal: 'Автоматическое продление',
      currentSubscription: 'Текущая подписка:',
      errorSelected: 'Необходимо выбрать вариант',
      expire: 'Срок действия истекает',
      modalCancelSubscription: {
        error: 'Ошибка отключения автопродления',
        success: 'Автопродление успешно отменено',
        text: 'Автопродление будет выключено. Вы уверены?',
        textButton: 'OK',
        title: 'Отмена автопродления',
      },
      modalCreatePayment: {
        text: 'Автопродление будет включено для этого платежа. Вы можете отключить его в любой момент из своего профиля',
        textButton: 'OK',
        title: 'Оплата подписки',
      },
      modalRequestError: {
        text: 'Транзакция не удалась. Пожалуйста, напишите в поддержку',
        textButton: 'Вернуться к оплате',
        title: 'Ошибка',
      },
      modalRequestSuccess: {
        text: 'Оплата прошла успешно!',
        textButton: 'Ок',
        title: 'Успешно',
      },
      nextPayment: 'Следующий платеж',
      subscriptionCosts: 'Стоимость вашей подписки:',
    },
    addProfilePhoto: 'Добавьте фото профиля',
    addProfilePhotoBlocked: 'Добавление фото профиля недоступно в режиме просмотра',
    clickHereAddProfilePhoto: 'Нажмите здесь, чтобы добавить фотографию профиля',
    dateOfBirth: 'Дата рождения',
    devices: 'Устройства',
    error: 'Ошибка',
    errorServerIsNotAvailable: 'Ошибка! Сервер недоступен!',
    firstName: 'Имя',
    generalInformation: 'Основная информация',
    lastName: 'Фамилия',
    myPayments: 'Мои платежи',
    privacyPolicy: 'Политика конфиденциальности',
    profileSaved: 'Профиль сохранен',
    save: 'Сохранить',
    saveChanges: 'Сохранить изменения',
    selectFromComputer: 'Выберите с компьютера',
    selectYourCity: 'Выберите свой город',
    selectYourCountry: 'Выберите свою страну',
    userName: 'Имя пользователя',
    yourSettingsAreSaved: 'Ваши настройки сохранены!',
  },
  nav: {
    areYouWantToLogOut: 'Вы действительно хотите выйти из своей учетной записи',
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    logout: 'Выйти',
    messenger: 'Сообщения',
    myProfile: 'Мой профиль',
    no: 'Нет',
    search: 'Поиск',
    statistics: 'Статистика',
    yes: 'Да',
  },
  other: {
    noData: 'Нет данных...',
    showLess: 'спрятать',
    showMore: 'показать больше',
  },
  post: {
    deletePost: 'Удалить пост',
    editPost: 'Редактировать пост',
    no: 'Нет',
    sureWantDeletePost: 'Вы уверены, что хотите удалить этот пост?',
    yes: 'Да',
  },
  postEdition: {
    modalConfirmCloseEditionPost: {
      buttonRejectionTitle: 'Нет',
      buttonTitle: 'Да',
      text: 'Вы действительно хотите закрыть редактирование поста? Если вы закроете изменения, они не сохранятся.',
      titleModalWithConfirm: 'Закрыть публикацию',
    },
    publicationSuccessfullyEdited: 'Публикация успешно изменена',
    titleFormEditPost: 'Добавьте описание публикации',
    titleHeaderModalEditPost: 'Редактирование публикации',
  },
  russian: 'Русский',
  signUp: {
    and: 'и',
    confirmPassword: 'Подтверждение пароля',
    email: 'Почта',
    haveAccount: 'У Вас уже есть аккаунт?',
    isAgreement: 'Я согласен с ',
    password: 'Пароль',
    privacyPolicy: 'Политикой конфиденциальности',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    termsOfServices: 'Правилами использования',
    userName: 'Имя пользователя',
  },
  verificationLinkExpired: {
    button: 'Получить заново',
    modal: {
      buttonTitle: 'Хорошо',
      subtitle: 'Инструкции успешно отправлены на ваш адрес ',
      throttleSubtitleEnd: ' секунд перед следующей попыткой.',
      throttleSubtitleStart: 'Пожалуйста, подождите ',
      title: 'Письмо отправлено',
    },
    subtitle: 'Кажется, прошло слишком много времени и срок действия ссылки истек',
    title: 'Срок действия ссылки истек',
  },
}

export type LocaleType = typeof ru

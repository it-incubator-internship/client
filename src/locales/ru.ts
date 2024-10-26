import { pluralizeEn, pluralizeRu } from '@/utils/createPluralize'

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
    sentConfirmationLink(responseEmail: string) {
      return `Мы отправили ссылку для подтверждения почты на адрес: ${responseEmail}`
    },
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    terms: 'Правилами',
    username: 'Имя пользователя',
  },
  createNewPassword: {
    newPasswordForm: {
      button: 'Создать новый пароль',
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
    cropDescription: 'Нажмите сюда, чтобы обрезать новое фото',
    cropTitle: 'Обрезать фото',
    filterDescription: 'Нажмите сюда, чтобы добавить фильтры для фото',
    filterTitle: 'Добавить фильтр',
    openDraft: 'Открыть черновик',
    publishDescription: 'Нажмите сюда, чтобы опубликовать новое фото',
    publishTitle: 'Опубликовать',
    selectFromComputer: 'Выбрать на этом компьютере',
    errorMaxPhotos: 'Вы можете загрузить максимум 5 фотографий.',
    errorFileSize:
      'Выбранный файл превышает максимальный допустимый размер 10МБ. Пожалуйста, выберите файл меньшего размера.',
    errorFileType:
      'Выбранный тип файла не поддерживается. Пожалуйста, загрузите изображение в формате PNG или JPEG.',
  },
  devices: {
    activeSessions: 'Активные сессии',
    currentDevice: 'Текущее устройство',
    logOut: 'Выйти',
    terminateOtherSessions: 'Закрыть все сессии кроме текущей',
  },
  english: 'Английский',
  errors: {
    401: 'Не правильный логин или пароль',
    default: 'Что-то пошло не так',
    fetch_error: 'Проблемы с Вашим интернет соединением',
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
    passwordMatch: 'Пароли должны совпадать',
    passwordRegex:
      'Пароль может содержать символы: a-z, A-Z, 0-9, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _ ` { | } ~',
    required: 'Поле обязательно',
    termsAgreement: 'Пожалуйста, поставьте галочку, что Вы согласны с нашими правилами',
  },
  meta: {
    defaultDescriptionText:
      'Социальная сеть The Inctagram это безлимитная коммуникация людей по всему миру',
  },
  myProfile: {
    followers: 'Подписчики',
    following: 'Подписки',
    initialUrlProfile: 'Url пользователя',
    publications: 'Публикации',
  },
  nav: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'Главная',
    logout: 'Выйти',
    messenger: 'Сообщения',
    myProfile: 'Мой профиль',
    search: 'Поиск',
    statistics: 'Статистика',
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
}

export type LocaleType = typeof ru

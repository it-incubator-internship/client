export const ru = {
  auth: {
    forgotPassword: 'Восстановить пароль',
    noAccount: 'Нет аккаунта?',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
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
  devices: {
    activeSessions: 'Активные сессии',
    currentDevice: 'Текущее устройство',
    logOut: 'Выйти',
    terminateOtherSessions: 'Закрыть все сессии кроме текущей',
  },
  english: 'Английский',
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
  meta: {
    defaultDescriptionText:
      'Социальная сеть The Inctagram это безлимитная коммуникация людей по всему миру',
  },
  nav: {
    create: 'Создать',
    favorites: 'Избранное',
    home: 'На главную',
    logout: 'Выйти',
    messenger: 'Сообщения',
    myProfile: 'Мой профиль',
    search: 'Поиск',
    statistics: 'Статистика',
  },
  russian: 'Русский',
}

export type LocaleType = typeof ru

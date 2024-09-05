import React from 'react'

import { useLazyGoogleLoginQuery } from '@/services/auth/authApi'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@robur_/ui-kit'

import s from './SocialMediaAuth.module.scss'

export const SocialMediaAuth = () => {
  const [googleLogin] = useLazyGoogleLoginQuery()

  const googleLoginHandler = () => {
    console.log('google login')
    googleLogin()
  }

  return (
    <div className={s.container}>
      <a
        className={s.btn}
        href={
          'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https%3A%2F%2Fnavaibe.ru%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fredirect&scope=profile%20email&client_id=145106821045-oud30j9s8m88l6icdc536vqhoc3k7un7.apps.googleusercontent.com'
        }
        type={'button'}
      >
        <GoogleSvgrepoCom1 className={s.svg} onClick={googleLoginHandler} />
      </a>
      <button className={s.btn} type={'button'}>
        <GithubSvgrepoCom31 className={s.svg} />
      </button>
    </div>
  )
}

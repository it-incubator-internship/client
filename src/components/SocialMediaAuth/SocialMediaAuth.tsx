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
      <button className={s.btn} type={'button'}>
        <GoogleSvgrepoCom1 className={s.svg} onClick={googleLoginHandler} />
      </button>
      <button className={s.btn} type={'button'}>
        <GithubSvgrepoCom31 className={s.svg} />
      </button>
    </div>
  )
}

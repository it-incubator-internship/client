import React from 'react'

import { useLazyGithubLoginQuery, useLazyGoogleLoginQuery } from '@/services/auth/authApi'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@robur_/ui-kit'

import s from './SocialMediaAuth.module.scss'

export const SocialMediaAuth = () => {
  const [googleLogin] = useLazyGoogleLoginQuery()
  const [gihubLogin] = useLazyGithubLoginQuery()

  const googleLoginHandler = () => {
    console.log('google login')
    googleLogin()
  }
  const githubLoginHandler = () => {
    console.log('github login')
    gihubLogin()
      .unwrap()
      .catch(error => {
        console.log(error)
      })
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
      <a
        className={s.btn}
        href={
          'https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fnavaibe.ru%2Fapi%2Fv1%2Fauth%2Fgithub%2Fcallback&scope=user%3Aemail&client_id=Ov23liPXUAuNE4Qn65BU'
        }
        type={'button'}
      >
        <GithubSvgrepoCom31 className={s.svg} onClick={githubLoginHandler} />
      </a>
    </div>
  )
}

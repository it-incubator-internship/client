import { useLazyGithubLoginQuery, useLazyGoogleLoginQuery } from '@/services/auth/authApi'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@robur_/ui-kit'

import s from './SocialMediaAuth.module.scss'

export const SocialMediaAuth = () => {
  const [googleLogin] = useLazyGoogleLoginQuery()
  const [githubLogin] = useLazyGithubLoginQuery()

  const googleLoginHandler = () => {
    googleLogin()
      .unwrap()
      .catch(error => {
        console.log(error)
      })
  }
  const githubLoginHandler = () => {
    githubLogin()
      .unwrap()
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={s.container}>
      <a className={s.btn} href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL} type={'button'}>
        <GoogleSvgrepoCom1 className={s.svg} onClick={googleLoginHandler} />
      </a>
      <a className={s.btn} href={process.env.NEXT_PUBLIC_GITHUB_AUTH_URL} type={'button'}>
        <GithubSvgrepoCom31 className={s.svg} onClick={githubLoginHandler} />
      </a>
    </div>
  )
}

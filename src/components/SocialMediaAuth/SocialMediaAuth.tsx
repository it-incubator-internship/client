import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@robur_/ui-kit'

import s from './SocialMediaAuth.module.scss'

export const SocialMediaAuth = () => {
  return (
    <div className={s.container}>
      <a className={s.btn} href={'https://navaibe.ru/api/v1/auth/google'} type={'button'}>
        <GoogleSvgrepoCom1 className={s.svg} />
      </a>
      <a className={s.btn} href={'https://navaibe.ru/api/v1/auth/github'} type={'button'}>
        <GithubSvgrepoCom31 className={s.svg} />
      </a>
    </div>
  )
}

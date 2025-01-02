import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@demorest49de/ui-kit'

import s from './SocialMediaAuth.module.scss'

export const SocialMediaAuth = () => {
  return (
    <div className={s.container}>
      <a className={s.btn} href={'https://navaibe.ru/api/v1/auth/google'}>
        <GoogleSvgrepoCom1 className={s.svg} />
      </a>
      <a className={s.btn} href={'https://navaibe.ru/api/v1/auth/github'}>
        <GithubSvgrepoCom31 className={s.svg} />
      </a>
    </div>
  )
}

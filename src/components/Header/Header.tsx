import { useEffect } from 'react'

import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import {
  Button,
  FlagRussia,
  FlagUnitedKingdom,
  OutlineBell,
  Select,
  SelectItem,
} from '@robur_/ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Header.module.scss'

export const Header = () => {
  const t = useTranslation()
  const { asPath, locale, pathname, push, query } = useRouter()
  const { data } = useMeQuery()
  const currentUserId = data?.userId
  const storageLocale = localStorage.getItem('currentLocale')

  useEffect(() => {
    if (storageLocale) {
      const locale = JSON.parse(storageLocale)

      void push(asPath, asPath, { locale })
    }
  }, [])

  let noProfile = false
  const { error: profileError } = useGetProfileQuery({ id: currentUserId as string })

  if (profileError && 'status' in profileError && profileError.status === 404) {
    noProfile = true
  }

  const isHomePage = pathname === '/'

  const logoClickHandler = () => {
    push('/')
  }

  const localeChangeHandler = (newLocale: string) => {
    localStorage.setItem('currentLocale', JSON.stringify(newLocale))
    push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <header className={s.header}>
      {isHomePage ? (
        <span className={clsx(s.logo, s.logoDisabled)}>Navaibe</span>
      ) : (
        <button className={s.logo} onClick={logoClickHandler} type={'button'}>
          Navaibe
        </button>
      )}
      <div className={s.options}>
        {data && (
          <Link className={s.link} href={`${PATH.PROFILE}/${currentUserId}`}>
            <span>{t.nav.myProfile}</span>
          </Link>
        )}

        {!currentUserId ||
          (noProfile && <p className={s.readOnlyNotification}>{t.meta.readOnlyNotification}</p>)}

        {data && (
          <button className={s.notifications} type={'button'}>
            <OutlineBell />
          </button>
        )}
        <div className={s.langSelect}>
          <Select
            defaultValue={storageLocale ? JSON.parse(storageLocale) : locale}
            onValueChange={localeChangeHandler}
            placeholder={'Pick language'}
          >
            <SelectItem value={'en'}>
              <div className={s.langOption}>
                <FlagUnitedKingdom className={s.flag} />
                <span>English</span>
              </div>
            </SelectItem>
            <SelectItem value={'ru'}>
              <div className={s.langOption}>
                <FlagRussia className={s.flag} />
                <span>Русский</span>
              </div>
            </SelectItem>
          </Select>
        </div>
        {!data && (
          <div className={s.navOptions}>
            <Button asChild variant={'ghost'}>
              <Link href={PATH.LOGIN}>{t.auth.signIn}</Link>
            </Button>
            <Button asChild variant={'primary'}>
              <Link href={PATH.REGISTRATION}>{t.auth.signUp}</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

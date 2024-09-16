import { useTranslation } from '@/hooks/useTranslation'
import { FlagRussia, FlagUnitedKingdom, OutlineBell, Select, SelectItem } from '@robur_/ui-kit'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './Header.module.scss'

export const Header = () => {
  const t = useTranslation()
  const { asPath, locale, pathname, push, query } = useRouter()
  const isHomePage = pathname === '/'

  const logoClickHandler = () => {
    push('/')
  }

  const localeChangeHandler = (newLocale: string) => {
    push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <header className={s.header}>
      {isHomePage ? (
        <span className={clsx(s.logo, s.logoDisabled)}>Inctagram</span>
      ) : (
        <button className={s.logo} onClick={logoClickHandler} type={'button'}>
          Inctagram
        </button>
      )}
      <div className={s.options}>
        <button className={s.notifications} type={'button'}>
          <OutlineBell />
        </button>
        <div className={s.langSelect}>
          <Select
            defaultValue={locale}
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
      </div>
    </header>
  )
}

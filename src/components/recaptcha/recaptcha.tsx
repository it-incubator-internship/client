import { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './recaptcha.module.scss'

import CheckIcon from './CheckmarkOutline'
import RecycleIcon from './Recaptchalogo1'

type DisclaimerLinks = [string, string]

export type RecaptchaProps = {
  disclaimerLinks?: DisclaimerLinks
  errorMsg?: string
  expiredMsg?: string
  label?: string
  onClick?: () => void
  variant: 'checked' | 'expired' | 'initial' | 'loading' | 'withError'
} & ComponentPropsWithoutRef<'div'>

export const Recaptcha = (props: RecaptchaProps) => {
  const {
    disclaimerLinks = [
      'https://policies.google.com/privacy?hl=ru',
      'https://policies.google.com/terms?hl=ru',
    ],
    errorMsg = 'Please verify that you are not a robot',
    expiredMsg = 'Verification expired. Check the checkbox again.',
    label = 'I’m not a robot',
    onClick,
    variant,
    ...rest
  } = props

  return (
    <div {...rest} className={variant === 'withError' ? s.errorWrapper : ''}>
      <div className={clsx(s.recaptchaRoot)}>
        <Indicator onClick={onClick} variant={variant} />
        <div className={s.label}>{label}</div>
        <div className={s.recaptchaDisclaimer}>
          <RecycleIcon className={s.recycleIcon} />
          <a href={disclaimerLinks[0]}>Privacy</a>
          <span> - </span>
          <a href={disclaimerLinks[1]}>Terms</a>
        </div>
        {variant === 'expired' && <div className={s.expiredMsg}>{expiredMsg}</div>}
      </div>
      {variant === 'withError' && <div className={s.errorMsg}>{errorMsg}</div>}
    </div>
  )
}

type IndicatorProps = {
  onClick?: () => void
  variant: RecaptchaProps['variant']
}

const Indicator = ({ onClick, variant }: IndicatorProps) => {
  function getIndicator(variant: RecaptchaProps['variant']) {
    switch (true) {
      case variant === 'initial' || variant === 'withError' || variant === 'expired':
        return <button className={s.btnCheck} onClick={onClick}></button>
      case variant === 'checked':
        return (
          <div className={s.checkedIcon}>
            <CheckIcon />
          </div>
        )
      case variant === 'loading':
        return <div className={s.loader}></div>
      default:
        return <div></div>
    }
  }

  return <>{getIndicator(variant)}</>
}

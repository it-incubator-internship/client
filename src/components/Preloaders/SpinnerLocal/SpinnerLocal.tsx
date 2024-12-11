import clsx from 'clsx'

import s from './SpinnerLocal.module.scss'

type SpinnerLocalProps = {
  className?: string
}

export const SpinnerLocal = ({ className }: SpinnerLocalProps) => {
  return (
    <div className={clsx(s.wrapper, className)}>
      <div className={s.spinner}></div>
    </div>
  )
}

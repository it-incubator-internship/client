import clsx from 'clsx'

import s from './ThreeDotsLoader.module.scss'

type Props = {
  className?: string
}
export default function ThreeDotsLoader({ className }: Props) {
  return (
    <div className={clsx(s.wrapper, className)}>
      <div className={s[`dot-elastic`]}></div>
    </div>
  )
}

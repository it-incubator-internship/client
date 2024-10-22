import clsx from 'clsx'

import s from './error-message.module.scss'

type ErrorMessageProps = {
  className?: string
  message: string
}

export const ErrorMessage = ({ className, message }: ErrorMessageProps) => (
  <div className={clsx(s.errorMsg, className)}>{message}</div>
)

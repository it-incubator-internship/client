import s from './error-message.module.scss'

type ErrorMessageProps = {
  className?: string
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className={s.errorMsg}>{message}</div>
)

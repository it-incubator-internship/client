import s from './error-message.module.scss'

type ErrorMessageProps = {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className={s.errorMsg}>{message}</div>
)

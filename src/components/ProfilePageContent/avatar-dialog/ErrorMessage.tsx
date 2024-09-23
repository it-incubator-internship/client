import s from './avatar-dialog.module.scss'

type ErrorMessageProps = {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => <div className={s.errorMsg}>{message}</div>

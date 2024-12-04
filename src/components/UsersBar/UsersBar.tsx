import s from './UsersBar.module.scss'

type Props = {
  usersCount: number
}
export default function UsersBar({ usersCount }: Props) {
  return (
    <div className={s.usersBar}>
      <h3>Registered users:</h3>
      <div>{usersCount}</div>
    </div>
  )
}

import s from './UsersBar.module.scss'

type Props = {
  usersCount: number
}
export default function UsersBar({ usersCount }: Props) {
  const numbersArray = usersCount.toString().split('')

  return (
    <div className={s.usersBar}>
      <h3>Registered users:</h3>
      <div className={s.count}>
        <div className={s.number}>0</div>
        <div className={s.number}>0</div>
        {numbersArray &&
          numbersArray.map((number, idx) => {
            return (
              <div className={s.number} key={idx}>
                {number}
              </div>
            )
          })}
      </div>
    </div>
  )
}

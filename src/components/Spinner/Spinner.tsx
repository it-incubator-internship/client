import s from './Spinner.module.scss'
export default function Spinner() {
  return (
    <div className={s.spinWrapper}>
      <div className={s.spinner}></div>
    </div>
  )
}

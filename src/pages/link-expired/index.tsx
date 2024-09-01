import TimeManagement from '@/pages/link-expired/TimeManagement'
import { Button } from '@robur_/ui-kit'

import s from './link-expired.module.scss'

export default function LinkExpired() {
  const handleOnClick = () => {
    alert('The link was sent again')
  }

  return (
    <div className={s.outerWrapper}>
      <div className={s.innerWrapper}>
        <h1 className={s.title}>Email verification link expired</h1>
        <p className={s.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button fullWidth onClick={handleOnClick}>
          Resend link
        </Button>
      </div>
      <TimeManagement />
    </div>
  )
}

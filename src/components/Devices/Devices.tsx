import Spinner from '@/components/Spinner/Spinner'
import { useCloseAllSessionsMutation, useGetSessionsQuery } from '@/services/devices/devicesApi'
import { Button, Card } from '@robur_/ui-kit'

import s from './Devices.module.scss'

export const Devices = () => {
  const { data, isLoading } = useGetSessionsQuery()
  const [closeSessions, { isLoading: isClosingLoading }] = useCloseAllSessionsMutation()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={s.container}>
      <div className={s.block}>
        <h3 className={s.title}>Current device</h3>
        <Card className={s.device}>
          <p>Chrome</p>
          <p>IP: ::ffff:10.244.0.90</p>
        </Card>
      </div>
      <Button
        className={s.btn}
        disabled={isClosingLoading}
        onClick={() => closeSessions()}
        variant={'outlined'}
      >
        Terminate all other session
      </Button>
      <div className={s.block}>
        <h3 className={s.title}>Active sessions</h3>
        <div className={s.devices}>
          {data?.map(session => {
            return (
              <Card className={s.device} key={session.sessionId}>
                <p>IP: {session.ip}</p>
                <p>
                  Last visit:{' '}
                  {new Date(session.lastActiveDate).toLocaleString([], {
                    day: 'numeric',
                    hour: undefined,
                    minute: undefined,
                    month: 'numeric',
                    second: undefined,
                    year: 'numeric',
                  })}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

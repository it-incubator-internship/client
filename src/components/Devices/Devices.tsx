import Spinner from '@/components/Spinner/Spinner'
import {
  useCloseAllSessionsMutation,
  useCloseSessionMutation,
  useGetSessionsQuery,
} from '@/services/devices/devicesApi'
import { Button, Card, LogOut } from '@robur_/ui-kit'
import Image from 'next/image'

import s from './Devices.module.scss'

export const Devices = () => {
  const { data, isLoading } = useGetSessionsQuery()
  const [closeSessions, { isLoading: isClosingLoading }] = useCloseAllSessionsMutation()
  const [closeSession] = useCloseSessionMutation()

  const handleCloseSession = async (sessionId: string) => {
    try {
      await closeSession(sessionId).unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className={s.container}>
      <div className={s.block}>
        <h3 className={s.title}>Current device</h3>
        <Card className={s.device}>
          <div className={s.deviceContainer}>
            <Image alt={'chrome'} height={36} src={'/icon-chrome.svg'} width={36} />
            <div>
              <p>Chrome</p>
              <p>IP: ::ffff:10.244.0.90</p>
            </div>
          </div>
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
      {data && data.length > 1 && (
        <div className={s.block}>
          <h3 className={s.title}>Active sessions</h3>
          <div className={s.devices}>
            {data?.map(session => {
              return (
                <>
                  {!session.current && (
                    <Card className={s.device} key={session.sessionId}>
                      <div className={s.deviceContainer}>
                        <div className={s.info}>
                          <Image alt={'chrome'} height={36} src={'/icon-desktop.svg'} width={36} />
                          <div>
                            <p>IP: {session.ip}</p>
                            <p>
                              Last visit:&nbsp;
                              {new Date(session.lastActiveDate).toLocaleString([], {
                                day: 'numeric',
                                hour: undefined,
                                minute: undefined,
                                month: 'numeric',
                                second: undefined,
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <button
                          className={s.logOut}
                          onClick={() => handleCloseSession(session.sessionId)}
                          type={'button'}
                        >
                          <LogOut height={24} width={24} />
                          <span>Log out</span>
                        </button>
                      </div>
                    </Card>
                  )}
                </>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

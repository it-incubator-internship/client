import React, { ReactNode } from 'react'

import { ChromeIcon, FireFoxIcon, SafariIcon, YandexIcon } from '@/assets/components'
import Spinner from '@/components/Spinner/Spinner'
import { useTranslation } from '@/hooks/useTranslation'
import {
  useCloseAllSessionsMutation,
  useCloseSessionMutation,
  useGetSessionsQuery,
} from '@/services/devices/devicesApi'
import { convertDeviceData } from '@/utils/convertDeviceData'
import { Button, Card, LogOut } from '@robur_/ui-kit'
import Image from 'next/image'

import s from './Devices.module.scss'

export const Devices = () => {
  const { data, isLoading } = useGetSessionsQuery()
  const [closeSessions, { isLoading: isClosingLoading }] = useCloseAllSessionsMutation()
  const [closeSession] = useCloseSessionMutation()
  const t = useTranslation()

  const browserIcons = {
    Chrome: <ChromeIcon />,
    Firefox: <FireFoxIcon />,
    Safari: <SafariIcon />,
    Yandex: <YandexIcon />,
  } as Record<string, ReactNode>
  let currentDeviceBrowserType
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

  const currentDevice = data?.find(session => {
    return session.current
  })

  if (currentDevice) {
    currentDeviceBrowserType = convertDeviceData(currentDevice.deviceName).browser
  }

  return (
    <div className={s.container}>
      {currentDevice && (
        <div className={s.block}>
          <h3 className={s.title}>{t.devices.currentDevice}</h3>
          <Card className={s.device}>
            <div className={s.deviceContainer}>
              {currentDeviceBrowserType && browserIcons[currentDeviceBrowserType]}
              <div>
                <p>{currentDeviceBrowserType}</p>
                <p>IP: {currentDevice?.ip}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
      <Button
        className={s.btn}
        disabled={isClosingLoading}
        onClick={() => closeSessions()}
        variant={'outlined'}
      >
        {t.devices.terminateOtherSessions}
      </Button>
      {data && data.length > 1 && (
        <div className={s.block}>
          <h3 className={s.title}>{t.devices.activeSessions}</h3>
          <div className={s.devices}>
            {data?.map(session => {
              const { deviceType } = convertDeviceData(session.deviceName)

              return (
                <React.Fragment key={session.sessionId}>
                  {!session.current && (
                    <Card className={s.device}>
                      <div className={s.deviceContainer}>
                        <div className={s.info}>
                          {deviceType === 'desktop' ? (
                            <Image
                              alt={'device type'}
                              height={36}
                              src={'/icon-desktop.svg'}
                              width={36}
                            />
                          ) : (
                            <Image
                              alt={'device type'}
                              height={34}
                              src={'/icon-mobile.svg'}
                              width={20}
                            />
                          )}
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
                          <span>{t.devices.logOut}</span>
                        </button>
                      </div>
                    </Card>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

import { ChangeEvent } from 'react'

import { ImageOutline } from '@robur_/ui-kit'
import dynamic from 'next/dynamic'

import s from './avatar-selector.module.scss'

const Avatar = dynamic(() => import('react-avatar-edit'), { ssr: false })

type AvatarSelectorProps = {
  isError: string
  isFileLoad: boolean
  onBeforeFileLoad: (event: ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onCrop: (view: string) => void
  onFileLoad: () => void
}

export const AvatarSelector = (props: AvatarSelectorProps) => {
  const { isError, isFileLoad, onBeforeFileLoad, onClose, onCrop, onFileLoad } = props

  return (
    <>
      {isError ? (
        <div className={s.emptyAvatar}>
          <ImageOutline className={s.emptyAvatarLabel} />
        </div>
      ) : (
        <Avatar
          backgroundColor={'var(--color-dark-500)'}
          borderStyle={{ border: 'none' }}
          closeIconColor={'transparent'}
          height={isFileLoad ? 340 : 228}
          imageWidth={332}
          label={<ImageOutline className={s.emptyAvatarLabel} />}
          labelStyle={{
            alignItems: 'center',
            background: 'var(--color-dark-500)',
            cursor: 'pointer',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          onBeforeFileLoad={onBeforeFileLoad}
          onClose={onClose}
          onCrop={onCrop}
          onFileLoad={onFileLoad}
          shadingColor={'var(--color-dark-500)'}
          shadingOpacity={0.7}
          src={''}
          width={isFileLoad ? 332 : 222}
        />
      )}
    </>
  )
}

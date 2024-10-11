import { useEffect, useState } from 'react'

import { AvatarDialog } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/avatar-dialog'
import { useDeleteAvatarFromServerMutation, useLazyGetProfileQuery } from '@/services/profile/profile-api'
import { EditProfileResponse } from '@/services/profile/profile-types'
import { Close, ImageOutline, Modal } from '@robur_/ui-kit'

import s from './avatar-profile.module.scss'

type AvatarProfileProps = {
  currentUserId: string
  profileData: EditProfileResponse | undefined
}

export const AvatarProfile = ({ currentUserId, profileData }: AvatarProfileProps) => {
  const [isAvatarRemoveModal, setIsAvatarRemoveModal] = useState(false)
  const [avatarProgress, setAvatarProgress] = useState<'loading' | 'none' | 'success'>(
    profileData?.originalAvatarUrl ? 'success' : 'none'
  )
  const [getProfileData, result] = useLazyGetProfileQuery()
  const [deleteAvatar] = useDeleteAvatarFromServerMutation()

  useEffect(() => {
    const pollingProfileData = () => {
      const intervalId = setInterval(async () => {
        await getProfileData({ id: currentUserId as string })

        if (result.data?.profileStatus === 'READY') {
          setAvatarProgress('success')
          clearInterval(intervalId)
        }
      }, 3000)

      return intervalId
    }

    if (avatarProgress === 'loading') {
      const intervalId = pollingProfileData()

      return () => {
        clearInterval(intervalId)
      }
    }

    return
  }, [avatarProgress, currentUserId, getProfileData, result.data?.profileStatus])

  const openRemoveModal = () => {
    setIsAvatarRemoveModal(true)
  }

  const handleModalNoConfirm = () => {
    setIsAvatarRemoveModal(false)
  }

  const handleModalWithConfirm = () => {
    setAvatarProgress('none')
    deleteAvatar()
  }

  return (
    <>
      <div className={s.photoSection}>
        <div className={s.userPhoto}>
          {avatarProgress === 'none' ? (
            <ImageOutline height={'48'} width={'48'} />
          ) : (
            <div>
              {avatarProgress === 'loading' && <span className={s.avatarLoader}>Loading</span>}
              {avatarProgress === 'success' && (
                <>
                  <button className={s.removeAvatarBtn} onClick={openRemoveModal} type={'button'}>
                    <Close />
                  </button>
                  <img alt={'your avatar'} height={192} src={profileData?.originalAvatarUrl} width={192} />
                </>
              )}
            </div>
          )}
        </div>
        <AvatarDialog setAvatarProgress={setAvatarProgress} />
      </div>
      <Modal
        buttonRejectionTitle={'No'}
        buttonTitle={'Yes'}
        onClose={handleModalNoConfirm}
        onCloseWithApproval={handleModalWithConfirm}
        open={isAvatarRemoveModal}
        title={' '}
        withConfirmation
      >
        Do you really want to delete your profile photo?
      </Modal>
    </>
  )
}

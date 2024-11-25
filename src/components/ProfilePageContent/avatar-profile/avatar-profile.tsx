import { useEffect, useState } from 'react'

import { AvatarDialog } from '@/components/ProfilePageContent/avatar-profile/avatar-dialog/ui/avatar-dialog'
import { useTranslation } from '@/hooks/useTranslation'
import { useDeleteAvatarFromServerMutation, useLazyGetProfileQuery } from '@/services/profile/profile-api'
import { EditProfileResponse } from '@/services/profile/profile-types'
import { Close, Modal } from '@robur_/ui-kit'
import Image from 'next/image'

import s from './avatar-profile.module.scss'

type AvatarProfileProps = {
  currentUserId: string
  profileData: EditProfileResponse | undefined
}

export const AvatarProfile = ({ currentUserId, profileData }: AvatarProfileProps) => {
  const t = useTranslation()
  const [avatar, setAvatar] = useState<any>(null)
  const [isAvatarRemoveModal, setIsAvatarRemoveModal] = useState(false)
  const [avatarProgress, setAvatarProgress] = useState<'loading' | 'none' | 'success'>(
    profileData?.originalAvatarUrl ? 'success' : 'none'
  )
  const [getProfileData, result] = useLazyGetProfileQuery()
  const [deleteAvatar] = useDeleteAvatarFromServerMutation()

  useEffect(() => {
    const pollingProfileData = () => {
      const intervalId = setInterval(async () => {
        const response = await getProfileData({ id: currentUserId as string }).unwrap()

        if (response.profileStatus === 'READY') {
          setAvatar(null)
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
            <Image alt={'User Avatar'} className={s.avatarImage} height={208} src={'/default-avatar.jpg'} width={208} />
          ) : (
            <div>
              {avatarProgress === 'loading' && <img alt={'your avatar'} height={192} src={avatar} width={192} />}
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
        <AvatarDialog setAvatar={setAvatar} setAvatarProgress={setAvatarProgress} />
      </div>
      <Modal
        buttonRejectionTitle={t.myProfileAvatar.deleteDialog.buttonRejectionTitle}
        buttonTitle={t.myProfileAvatar.deleteDialog.buttonTitle}
        onClose={handleModalNoConfirm}
        onCloseWithApproval={handleModalWithConfirm}
        open={isAvatarRemoveModal}
        title={' '}
        withConfirmation
      >
        {t.myProfileAvatar.deleteDialog.text}
      </Modal>
    </>
  )
}

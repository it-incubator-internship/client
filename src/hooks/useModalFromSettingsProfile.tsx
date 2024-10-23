import { useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import { Modal } from '@robur_/ui-kit'
import Link from 'next/link'

export const variantModals = {
  failedSaveProfile: 'failedSaveProfile',
  successfulSaveProfile: 'successfulSaveProfile',
  youngUser: 'youngUser',
}

const getModalContent = (variant: string) => {
  // eslint-disable-next-line
  const t = useTranslation()

  switch (variant) {
    case variantModals.failedSaveProfile:
      return (
        <div>
          <p>{t.myProfileSettings.errorServerIsNotAvailable}</p>
        </div>
      )

    case variantModals.successfulSaveProfile:
      return (
        <div>
          <p>{t.myProfileSettings.yourSettingsAreSaved}</p>
        </div>
      )

    case variantModals.youngUser:
      return (
        <div>
          <p>{t.myProfileSettings.aUserUnder13CannotCreateProfile}</p>
          <Link href={'/privacy-policy'} target={'_blank'}>
            {t.myProfileSettings.privacyPolicy}
          </Link>
        </div>
      )

    default:
      return null
  }
}

const getModalArgs = (variant: string, onClose: () => void) => {
  // eslint-disable-next-line
  const t = useTranslation()

  return {
    children: getModalContent(variant),
    onClose,
    open: true,
    title:
      variant === variantModals.successfulSaveProfile
        ? t.myProfileSettings.profileSaved
        : t.myProfileSettings.error,
  }
}

export const useModalFromSettingsProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModal, setCurrentModal] = useState('')

  const openModal = (variant: string) => {
    setCurrentModal(variant)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentModal('')
  }

  const modalJSX = isModalOpen ? <Modal {...getModalArgs(currentModal, closeModal)} /> : null

  return { closeModal, modalJSX, openModal }
}

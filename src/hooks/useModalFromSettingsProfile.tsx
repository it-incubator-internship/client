import { useState } from 'react'

import { Modal } from '@demorest49de/ui-kit'
import Link from 'next/link'

export const variantModals = {
  failedSaveProfile: 'failedSaveProfile',
  successfulSaveProfile: 'successfulSaveProfile',
  youngUser: 'youngUser',
}

const getModalContent = (variant: string) => {
  switch (variant) {
    case variantModals.failedSaveProfile:
      return (
        <div>
          <p>Error! Server is not available!</p>
        </div>
      )

    case variantModals.successfulSaveProfile:
      return (
        <div>
          <p>Your settings are saved!</p>
        </div>
      )

    case variantModals.youngUser:
      return (
        <div>
          <p>A user under 13 cannot create a profile.</p>
          <Link href={'/privacy-policy'} target={'_blank'}>
            Privacy Policy
          </Link>
        </div>
      )

    default:
      return null
  }
}

const getModalArgs = (variant: string, onClose: () => void) => {
  return {
    children: getModalContent(variant),
    onClose,
    open: true,
    title: variant === variantModals.successfulSaveProfile ? 'Profile saved' : 'Error',
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

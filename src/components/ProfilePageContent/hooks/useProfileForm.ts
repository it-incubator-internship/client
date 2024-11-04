import { useEffect } from 'react'
import { UseFormReset, UseFormSetError } from 'react-hook-form'

import { useModalFromSettingsProfile, variantModals } from '@/hooks/useModalFromSettingsProfile'
import { useTranslation } from '@/hooks/useTranslation'
import { updateProfileFormValues } from '@/schemas/updateProfileSchema'
import { MeResponse } from '@/services/auth/authTypes'
import { useEditProfileMutation } from '@/services/profile/profile-api'
import { EditProfileResponse } from '@/services/profile/profile-types'
import { customErrorHandler } from '@/utils/customErrorHandler'
import { calculateAge, formatDateOfBirth } from '@/utils/profileUtils'
import { NextRouter } from 'next/router'

export type ZodKeys = keyof updateProfileFormValues

type Props = {
  currentUserId: string | undefined
  getCountriesFromLocalStorage: () => void
  meData: MeResponse | undefined
  profileData: EditProfileResponse | undefined
  reset: UseFormReset<updateProfileFormValues>
  router: NextRouter
  setError: UseFormSetError<updateProfileFormValues>
}

export const useProfileForm = ({
  currentUserId,
  getCountriesFromLocalStorage,
  profileData,
  reset,
  router,
  setError,
}: Props) => {
  const { modalJSX, openModal } = useModalFromSettingsProfile()

  const t = useTranslation()

  const [editProfile, { isError, isLoading: isLoadingEditProfile }] = useEditProfileMutation()

  useEffect(() => {
    if (profileData) {
      reset({
        aboutMe: profileData.aboutMe || '',
        city: profileData.city || '',
        country: profileData.country || '',
        dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        userName: profileData.userName || '',
      })

      getCountriesFromLocalStorage()
    }
  }, [profileData, reset, router.locale])

  const handleFormSubmit = async (dataForm: updateProfileFormValues) => {
    if (!currentUserId) {
      return
    }

    try {
      const birthDate = new Date(dataForm.dateOfBirth)
      const formattedDateOfBirth = formatDateOfBirth(birthDate)
      const age = calculateAge(birthDate)

      if (age < 13) {
        openModal(variantModals.youngUser)

        return
      }

      await editProfile({
        ...dataForm,
        dateOfBirth: formattedDateOfBirth,
        id: currentUserId,
      }).unwrap()

      openModal(variantModals.successfulSaveProfile)
    } catch (error: unknown) {
      customErrorHandler<ZodKeys>({ error, setError, translations: t })
      openModal(variantModals.failedSaveProfile)
    }
  }

  return {
    handleFormSubmit,
    isLoadingEditProfile,
    modalJSX,
    profileData,
  }
}

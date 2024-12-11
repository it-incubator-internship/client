import Spinner from '@/components/Preloaders/Spinner/Spinner'
import { NewPasswordForm } from '@/components/create-password/new-password-form/new-password-form'
import { PasswordLinkExpired } from '@/components/create-password/password-link-expired/password-link-expired'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { useCheckCodeQuery } from '@/services/password-recovery/password-recovery-api'
import { ServerError } from '@/services/password-recovery/password-recovery-types'
import { useRouter } from 'next/router'

function CreateNewPassword() {
  const router = useRouter()
  const { recoveryCode } = router.query
  const { error, isError, isLoading, isSuccess } = useCheckCodeQuery(recoveryCode as string)

  if (isLoading) {
    return <Spinner />
  }
  if (isSuccess) {
    return <NewPasswordForm recoveryCode={recoveryCode as string} />
  }
  if (isError) {
    const errorMessage = (error as ServerError).data?.message || 'Unexpected error occurred.'

    return <PasswordLinkExpired email={errorMessage} />
  }
}

CreateNewPassword.getLayout = getHeaderLayout
export default CreateNewPassword

import Spinner from '@/components/Spinner/Spinner'
import { NewPasswordForm } from '@/components/create-password/new-password-form/new-password-form'
import { PasswordLinkExpired } from '@/components/create-password/password-link-expired/password-link-expired'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { useCheckCodeQuery } from '@/services/password-recovery/password-recovery-api'
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
    // @ts-ignore
    return <PasswordLinkExpired email={error.data.message} />
  }
}

CreateNewPassword.getLayout = getHeaderLayout
export default CreateNewPassword

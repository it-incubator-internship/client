import Spinner from '@/components/Spinner/Spinner'
import { getHeaderLayout } from '@/components/layouts/HeaderLayout/HeaderLayout'
import { NewPasswordForm } from '@/components/new-password-form/new-password-form'
import { PasswordLinkExpired } from '@/components/password-link-expired/password-link-expired'
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

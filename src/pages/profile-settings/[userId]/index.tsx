import { ProfilePageSettings } from '@/components/ProfilePageSettings/ProfilePageSettings'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'

function ProfileEdit() {
  return <ProfilePageSettings />
}

ProfileEdit.getLayout = getCombinedLayout

export default ProfileEdit

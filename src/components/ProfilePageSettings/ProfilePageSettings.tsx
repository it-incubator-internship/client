import { AccountManagement } from '@/components/AccountManagement/AccountManagement'
import { Devices } from '@/components/Devices/Devices'
import { MyPayments } from '@/components/MyPayments/MyPayments'
import { ProfilePageContent } from '@/components/ProfilePageContent/ProfilePageContent'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { TabContent, Tabs } from '@robur_/ui-kit'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

type Props = {
  page?: string
}

export const ProfilePageSettings = ({ page }: Props) => {
  const t = useTranslation()
  const router = useRouter()
  const params = useParams()
  const onValueChange = (newValue: string) => {
    switch (newValue) {
      case 'devices':
        router.push(`${PATH.PROFILE_EDIT}/${params.userId}/devices`)
        break
      case 'account':
        router.push(`${PATH.PROFILE_EDIT}/${params.userId}/account`)
        break
      case 'information':
        router.push(`${PATH.PROFILE_EDIT}/${params.userId}`)
        break
      case 'payments':
        router.push(`${PATH.PROFILE_EDIT}/${params.userId}/payments`)
        break
      default:
        router.push(`${PATH.PROFILE_EDIT}/${params.userId}`)
    }
  }

  return (
    <div className={'container'}>
      <Tabs
        defaultValue={page ? page : 'information'}
        fullWidth
        onValueChange={onValueChange}
        tabs={[
          { title: t.myProfileSettings.generalInformation, value: 'information' },
          { title: t.myProfileSettings.devices, value: 'devices' },
          { title: t.myProfileSettings.accountManagement, value: 'account' },
          { title: t.myProfileSettings.myPayments, value: 'payments' },
        ]}
      >
        <>
          <TabContent value={'information'}>
            <ProfilePageContent />
          </TabContent>
          <TabContent value={'devices'}>
            <Devices />
          </TabContent>
          <TabContent value={'account'}>
            <AccountManagement />
          </TabContent>
          <TabContent value={'payments'}>
            <MyPayments />
          </TabContent>
        </>
      </Tabs>
    </div>
  )
}

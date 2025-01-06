import { AccountManagement } from '@/components/AccountManagement/AccountManagement'
import { Devices } from '@/components/Devices/Devices'
import { ProfilePageContent } from '@/components/ProfilePageContent/ProfilePageContent'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
import { useTranslation } from '@/hooks/useTranslation'
import { TabContent, Tabs } from '@robur_/ui-kit'

function ProfileEdit() {
  const t = useTranslation()

  return (
    <div className={'container'}>
      <Tabs
        defaultValue={'information'}
        fullWidth
        tabs={[
          { title: t.myProfileSettings.generalInformation, value: 'information' },
          { title: t.myProfileSettings.devices, value: 'devices' },
          { title: t.myProfileSettings.accountManagement, value: 'account' },
          { disabled: true, title: t.myProfileSettings.myPayments, value: 'payments' },
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
          <TabContent value={'payments'}>Content about My payments</TabContent>
        </>
      </Tabs>
    </div>
  )
}

ProfileEdit.getLayout = getCombinedLayout

export default ProfileEdit

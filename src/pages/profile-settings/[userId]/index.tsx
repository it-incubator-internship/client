import { Devices } from '@/components/Devices/Devices'
import { ProfilePageContent } from '@/components/ProfilePageContent/ProfilePageContent'
import { getCombinedLayout } from '@/components/layouts/CombinedLayout/CombinedLayout'
// import { useMeQuery } from '@/services/auth/authApi'
import { TabContent, Tabs } from '@demorest49de/ui-kit'

function ProfileEdit() {
  // const { data } = useMeQuery()

  return (
    <div className={'container'}>
      <Tabs
        defaultValue={'information'}
        fullWidth
        tabs={[
          { title: 'General information', value: 'information' },
          { title: 'Devices', value: 'devices' },
          { disabled: true, title: 'Account Management', value: 'account' },
          { disabled: true, title: 'My payments', value: 'payments' },
        ]}
      >
        <>
          <TabContent value={'information'}>
            <ProfilePageContent />
          </TabContent>
          <TabContent value={'devices'}>
            <Devices />
          </TabContent>
          <TabContent value={'account'}>Content about Account Management</TabContent>
          <TabContent value={'payments'}>Content about My payments</TabContent>
        </>
      </Tabs>
    </div>
  )
}

ProfileEdit.getLayout = getCombinedLayout

export default ProfileEdit

import { getLayout } from '@/components/Layout/Layout'
import { TabContent, Tabs } from '@robur_/ui-kit'

function Profile() {
  return (
    <div className={'container'}>
      <Tabs
        defaultValue={'information'}
        fullWidth
        tabs={[
          { title: 'General information', value: 'information' },
          { disabled: true, title: 'Devices', value: 'devices' },
          { disabled: true, title: 'Account Management', value: 'account' },
          { disabled: true, title: 'My payments', value: 'payments' },
        ]}
      >
        <>
          <TabContent value={'information'}>Content about General information</TabContent>
          <TabContent value={'devices'}>Content about Devices</TabContent>
          <TabContent value={'account'}>Content about Account Management</TabContent>
          <TabContent value={'payments'}>Content about My payments</TabContent>
        </>
      </Tabs>
    </div>
  )
}

Profile.getLayout = getLayout

export default Profile

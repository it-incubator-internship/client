import { ProfilePageContent } from '@/components/ProfilePageContent/ProfilePageContent'
import Spinner from '@/components/Spinner/Spinner'
import { getSideBarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout'
import { TabContent, Tabs } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

function Profile() {
  const router = useRouter()
  const userId = router.query.userId

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
          <TabContent value={'information'}>
            <ProfilePageContent />
          </TabContent>
          <TabContent value={'devices'}>Content about Devices</TabContent>
          <TabContent value={'account'}>Content about Account Management</TabContent>
          <TabContent value={'payments'}>Content about My payments</TabContent>
        </>
      </Tabs>
      <p>{`userId: ${userId}`}</p>
    </div>
  )
}

Profile.getLayout = getSideBarLayout

export default Profile

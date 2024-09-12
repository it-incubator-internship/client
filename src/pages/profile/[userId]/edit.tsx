import { ProfilePageContent } from '@/components/ProfilePageContent/ProfilePageContent'
import { getSideBarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout'
import { useMeQuery } from '@/services/auth/authApi'
import { TabContent, Tabs } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

function ProfileEdit() {
  const router = useRouter()
  const userId = router.query.userId
  const { data } = useMeQuery()

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
            <ProfilePageContent isEditMode />
          </TabContent>
          <TabContent value={'devices'}>Content about Devices</TabContent>
          <TabContent value={'account'}>Content about Account Management</TabContent>
          <TabContent value={'payments'}>Content about My payments</TabContent>
        </>
      </Tabs>
      <p>{`userId: ${userId}`}</p>
      {data?.userName}
    </div>
  )
}

ProfileEdit.getLayout = getSideBarLayout

export default ProfileEdit

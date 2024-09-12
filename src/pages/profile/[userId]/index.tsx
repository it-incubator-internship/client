import { ProfilePageContent } from '@/components/ProfilePageContent/ProfilePageContent'
import { getSideBarLayout } from '@/components/layouts/SidebarLayout/SidebarLayout'
import { useMeQuery } from '@/services/auth/authApi'
import { TabContent, Tabs } from '@robur_/ui-kit'
import { useRouter } from 'next/router'

function Profile() {
  const router = useRouter()
  const userId = router.query.userId
  const { data } = useMeQuery()

  return (
    <div className={'container'}>
      <Tabs
        defaultValue={'information'}
        fullWidth
        tabs={[{ title: 'General information', value: 'information' }]}
      >
        <>
          <TabContent value={'information'}>
            <ProfilePageContent />
          </TabContent>
        </>
      </Tabs>
      <p>{`userId: ${userId}`}</p>
      {data?.userName}
    </div>
  )
}

Profile.getLayout = getSideBarLayout

export default Profile

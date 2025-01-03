import { useState } from 'react'

import { CreatePostDialog } from '@/components/posts/create/ui/create-post-dialog/create-post-dialog'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/useTranslation'
import { useLogoutMutation, useMeQuery } from '@/services/auth/authApi'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import {
  BookmarkOutline,
  HomeOutline,
  LogOut,
  MessageCircleOutline,
  Modal,
  Person,
  PlusSquareOutline,
  Search,
  Sidebar,
  TrendingUpOutline,
} from '@robur_/ui-kit'
import clsx from 'clsx'

import { SidebarItem } from './SidebarItem/SidebarItem'

type Props = {
  className?: string
}
export const Navbar = ({ className }: Props) => {
  const t = useTranslation()
  const { data: meData } = useMeQuery()
  const currentUserId = meData?.userId
  const currentUserName = meData?.userName
  let noProfile = false

  const [logout] = useLogoutMutation()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { error: profileError } = useGetProfileQuery({ id: currentUserId as string })

  if (profileError && 'status' in profileError && profileError.status === 404) {
    noProfile = true
  }

  function handleModalOpened() {
    setModalIsOpen(true)
  }

  function handleModalClosed() {
    setModalIsOpen(false)
  }

  function handleModalApproved() {
    logout()
  }

  return (
    <nav className={clsx(className)}>
      <Sidebar>
        <SidebarItem Icon={HomeOutline} href={PATH.HOME}>
          <span>{t.nav.home}</span>
        </SidebarItem>
        <CreatePostDialog>
          <SidebarItem Icon={PlusSquareOutline} as={'div'} disabled={noProfile} href={''}>
            <button type={'button'}>{t.nav.create}</button>
          </SidebarItem>
        </CreatePostDialog>
        <SidebarItem Icon={Person} href={`${PATH.PROFILE}/${currentUserId}`}>
          <span>{t.nav.myProfile}</span>
        </SidebarItem>
        <SidebarItem Icon={MessageCircleOutline} disabled={noProfile} href={PATH.MESSAGES}>
          <span>{t.nav.messenger}</span>
        </SidebarItem>
        <SidebarItem Icon={Search} disabled={noProfile} href={PATH.SEARCH}>
          <span>{t.nav.search}</span>
        </SidebarItem>
        <div style={{ marginTop: '60px' }}>
          <SidebarItem Icon={TrendingUpOutline} disabled={noProfile} href={PATH.STATISTICS}>
            <span>{t.nav.statistics}</span>
          </SidebarItem>
          <SidebarItem Icon={BookmarkOutline} disabled={noProfile} href={PATH.BOOKMARKS}>
            <span>{t.nav.favorites}</span>
          </SidebarItem>
        </div>
        <div style={{ marginTop: '150px' }}>
          <SidebarItem
            Icon={LogOut}
            as={'button'}
            href={''}
            onClick={() => handleModalOpened()}
            type={'button'}
          >
            <span>{t.nav.logout}</span>
          </SidebarItem>
        </div>
      </Sidebar>
      <Modal
        buttonRejectionTitle={t.nav.no}
        buttonTitle={t.nav.yes}
        onClose={handleModalClosed}
        onCloseWithApproval={handleModalApproved}
        open={modalIsOpen}
        title={t.nav.logout}
        withConfirmation
      >
        <p>{`${t.nav.areYouWantToLogOut} ${currentUserName}?`}</p>
      </Modal>
    </nav>
  )
}

import { PATH } from '@/consts/route-paths'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useLogoutMutation, useMeQuery } from '@/services/auth/authApi'
import {
  BookmarkOutline,
  HomeOutline,
  LogOut,
  MessageCircleOutline,
  Person,
  PlusSquareOutline,
  Search,
  Sidebar,
  TrendingUpOutline,
  Modal,
  Button,
} from '@robur_/ui-kit'

import { SidebarItem } from './SidebarItem/SidebarItem'

type Props = {
  className?: string
}
export const Navbar = ({ className }: Props) => {
  const t = useTranslation()
  const { data } = useMeQuery()

  const [logout] = useLogoutMutation()
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
    <nav className={className}>
      <Sidebar>
        <SidebarItem Icon={HomeOutline} href={PATH.HOME} item={t.nav.home} />
        <SidebarItem Icon={PlusSquareOutline} href={PATH.CREATE} item={t.nav.create} />
        <SidebarItem
          Icon={Person}
          href={`/profile-settings/${data?.userId}`}
          item={t.nav.myProfile}
        />
        <SidebarItem Icon={MessageCircleOutline} href={PATH.MESSAGES} item={t.nav.messenger} />
        <SidebarItem Icon={Search} href={PATH.SEARCH} item={t.nav.search} />
        <div style={{ marginTop: '60px' }}>
          <SidebarItem Icon={TrendingUpOutline} href={PATH.STATISTICS} item={t.nav.statistics} />
          <SidebarItem Icon={BookmarkOutline} href={PATH.BOOKMARKS} item={t.nav.favorites} />
        </div>
        <div style={{ marginTop: '150px' }}>
          <div onClick={() => handleModalOpened()}>
            <SidebarItem Icon={LogOut} href={'/'} item={t.nav.logout} />
            {/*<SidebarItem*/}
            {/*  Icon={LogOut}*/}
            {/*  as={'button'}*/}
            {/*  href={'/'}*/}
            {/*  item={t.nav.logout}*/}
            {/*  onClick={() => logout()}*/}
            {/*  type={'button'}*/}
            {/*/>*/}
          </div>
        </div>
      </Sidebar>
      <Modal
        buttonRejectionTitle={'No'}
        buttonTitle={'Yes'}
        onClose={handleModalClosed}
        onCloseWithApproval={handleModalApproved}
        open
        title={'Log out'}
        withConfirmation
        open={modalIsOpen}
      >
        <p>{`Are you really want to log out of your account ${data?.userName}?`}</p>
      </Modal>
    </nav>
  )
}

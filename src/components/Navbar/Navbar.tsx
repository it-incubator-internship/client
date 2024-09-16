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
        <SidebarItem Icon={HomeOutline} href={'/'} item={t.nav.home} />
        <SidebarItem Icon={PlusSquareOutline} href={'/'} item={t.nav.create} />
        <SidebarItem Icon={Person} href={`/profile/${data?.userId}`} item={t.nav.myProfile} />
        <SidebarItem Icon={MessageCircleOutline} href={'/'} item={t.nav.messenger} />
        <SidebarItem Icon={Search} href={'/'} item={t.nav.search} />
        <div style={{ marginTop: '60px' }}>
          <SidebarItem Icon={TrendingUpOutline} href={'/'} item={t.nav.statistics} />
          <SidebarItem Icon={BookmarkOutline} href={'/'} item={t.nav.favorites} />
        </div>
        <div style={{ marginTop: '150px' }}>
          <div onClick={() => handleModalOpened()}>
            <SidebarItem Icon={LogOut} href={'/'} item={t.nav.logout} />
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

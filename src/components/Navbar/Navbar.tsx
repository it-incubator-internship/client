import React from 'react'

import { useLogoutMutation } from '@/services/auth/authApi'

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
} from '@robur_/ui-kit'

import { SidebarItem } from './SidebarItem/SidebarItem'

type Props = {
  className?: string
}
export const Navbar = ({ className }: Props) => {
  const [logout, { isLoading, isError }] = useLogoutMutation()

  return (
    <nav className={className}>
      <Sidebar>
        <SidebarItem Icon={HomeOutline} href={'/'} item={'Home'} />
        <SidebarItem Icon={PlusSquareOutline} href={'/'} item={'Create'} />
        <SidebarItem Icon={Person} href={'/sign-in'} item={'My profile'} />
        <SidebarItem Icon={MessageCircleOutline} href={'/'} item={'Messenger'} />
        <SidebarItem Icon={Search} href={'/'} item={'Search'} />
        <div style={{ marginTop: '60px' }}>
          <SidebarItem Icon={TrendingUpOutline} href={'/'} item={'Statistics'} />
          <SidebarItem Icon={BookmarkOutline} href={'/'} item={'Favorites'} />
        </div>
        <div style={{ marginTop: '150px' }}>
          <div onClick={() => logout()}>
            <SidebarItem Icon={LogOut} href={'/'} item={'Logout'} />
          </div>
        </div>
      </Sidebar>
    </nav>
  )
}

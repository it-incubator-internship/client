import React from 'react'

import {
  BookmarkOutline,
  HomeOutline,
  ItemSideBar,
  LogOut,
  MessageCircleOutline,
  Person,
  PlusSquareOutline,
  Search,
  Sidebar,
  TrendingUpOutline,
} from '@robur_/ui-kit'

type Props = {
  className?: string
}
export const Navbar = ({ className }: Props) => {
  return (
    <nav className={className}>
      <Sidebar>
        <ItemSideBar Icon={HomeOutline} item={'Home'} />
        <ItemSideBar Icon={PlusSquareOutline} item={'Create'} />
        <ItemSideBar Icon={Person} item={'My profile'} />
        <ItemSideBar Icon={MessageCircleOutline} item={'Messenger'} />
        <ItemSideBar Icon={Search} item={'Search'} />
        <div style={{ marginTop: '60px' }}>
          <ItemSideBar Icon={TrendingUpOutline} item={'Statistics'} />
          <ItemSideBar Icon={BookmarkOutline} item={'Favorites'} />
        </div>
        <div style={{ marginTop: '150px' }}>
          <ItemSideBar Icon={LogOut} item={'Logout'} />
        </div>
      </Sidebar>
    </nav>
  )
}

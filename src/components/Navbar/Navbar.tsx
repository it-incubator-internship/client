import { useTranslation } from '@/hooks/useTranslation'
import { useMeQuery } from '@/services/auth/authApi'
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
  const t = useTranslation()
  const { data } = useMeQuery()

  const [logout] = useLogoutMutation()

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
          <div onClick={() => logout()}>
            <SidebarItem Icon={LogOut} href={'/'} item={t.nav.logout} />
          </div>
        </div>
      </Sidebar>
    </nav>
  )
}

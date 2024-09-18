import { PATH } from '@/consts/route-paths'
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
          <SidebarItem
            Icon={LogOut}
            as={'button'}
            href={'/'}
            item={t.nav.logout}
            onClick={() => logout()}
            type={'button'}
          />
        </div>
      </Sidebar>
    </nav>
  )
}

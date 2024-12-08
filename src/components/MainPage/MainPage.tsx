import { MainPagePhotos } from '@/components/MainPagePhotos'
import UsersBar from '@/components/UsersBar/UsersBar'
import { useTranslation } from '@/hooks/useTranslation'
import { PostWithOwner } from '@/services/posts/posts-types'

import s from './MainPage.module.scss'

type Props = {
  posts: PostWithOwner[]
  usersCount: number
}

const MainPage = ({ posts, usersCount }: Props) => {
  const t = useTranslation()

  return (
    <div className={s.mainPage}>
      {usersCount && <UsersBar usersCount={usersCount} />}
      {posts ? <MainPagePhotos posts={posts} /> : <div>{t.other.noData}</div>}
    </div>
  )
}

export default MainPage

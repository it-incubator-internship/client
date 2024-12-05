import { MainPagePhotos } from '@/components/MainPagePhotos'
import UsersBar from '@/components/UsersBar/UsersBar'
import { Post } from '@/services/posts/posts-types'

import s from './MainPage.module.scss'

type Props = {
  posts: Post[]
  usersCount: number
}

const MainPage = ({ posts, usersCount }: Props) => {
  return (
    <div className={s.mainPage}>
      {usersCount && <UsersBar usersCount={usersCount} />}
      {posts ? <MainPagePhotos posts={posts} /> : <div>There is no any data...</div>}
    </div>
  )
}

export default MainPage

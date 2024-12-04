import { NextPageWithLayout } from '@/pages/_app'
import { Post } from '@/services/posts/posts-types'
import Image from 'next/image'

import s from './mainPagePhotos.module.scss'

type MainPagePhotosProps = {
  // publicImages?: string[]
  posts: Post[]
}
export const MainPagePhotos: NextPageWithLayout<MainPagePhotosProps> = ({ posts }) => {
  console.log(posts)

  return (
    <div className={s.photoGrid}>
      {posts.map(post => {
        const imagePreview = post.images.find(item => {
          return item.originalImageUrl
        })

        return (
          <div className={s.photoItem} key={post.postId}>
            <Image
              alt={`User photo ${post.postId}`}
              height={240}
              layout={'responsive'}
              src={imagePreview?.originalImageUrl || '/photo-default-1.png'}
              width={234}
            />
            <div className={s.description}>{post.description}</div>
          </div>
        )
      })}
    </div>
  )
}

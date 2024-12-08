import { NextPageWithLayout } from '@/pages/_app'
import { Post } from '@/services/posts/posts-types'
import Image from 'next/image'

import s from './publicationsPhoto.module.scss'

type PublicationsPhotoProps = {
  // publicImages?: string[]
  posts: Post[]
}
export const PublicationsPhoto: NextPageWithLayout<PublicationsPhotoProps> = ({ posts }) => {
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
              height={228}
              layout={'responsive'}
              src={imagePreview?.originalImageUrl || '/photo-default-1.png'}
              width={234}
            />
          </div>
        )
      })}
    </div>
  )
}

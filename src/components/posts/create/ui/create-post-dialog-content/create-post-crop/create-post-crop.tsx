import { useAppSelector } from '@/services/store'

export const CreatePostCrop = () => {
  const images = useAppSelector(state => state.createPost.images)

  console.log('images', images)

  return <div>CreatePostCrop</div>
}

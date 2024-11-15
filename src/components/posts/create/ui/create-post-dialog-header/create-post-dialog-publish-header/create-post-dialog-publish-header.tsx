import { prevPage, resetState } from '@/components/posts/create/model/create-post-slice'
import { useTranslation } from '@/hooks/useTranslation'
import { useCreatePostMutation, useUploadPostPhotosMutation } from '@/services/posts/posts-api'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { createFormData } from '@/utils/createFormData'
import { saveFilteredImage } from '@/utils/filter-helpers'
import { getBinaryImageData } from '@/utils/getBinaryImageData'
import { showErrorToast, showSuccessToast } from '@/utils/toastConfig'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowIosBackOutline, Button } from '@robur_/ui-kit'

import s from './create-post-dialog-publish-header.module.scss'

type Props = {
  closeHandler: () => void
}

export const CreatePostDialogPublishHeader = ({ closeHandler }: Props) => {
  const t = useTranslation()
  const [createPost, { isLoading: isCreatingPostLoading }] = useCreatePostMutation()
  const [uploadPostPhotos] = useUploadPostPhotosMutation()
  const croppedImages = useAppSelector(state => state.createPost.croppedImages)
  const filters = useAppSelector(state => state.createPost.filters)
  const newPostDescription = useAppSelector(state => state.createPost.postDescription)
  const dispatch = useAppDispatch()
  const onPrevPage = () => dispatch(prevPage())

  const publishHandler = async () => {
    const croppedImagesWithFilter = croppedImages.map(item => {
      return {
        ...item,
        filter: filters[item.id],
      }
    })
    const imgWithFilter = await saveFilteredImage(croppedImagesWithFilter)
    const binaryImages = await getBinaryImageData(imgWithFilter)
    const formattedToFormData = createFormData(binaryImages)

    try {
      const { postId } = await createPost({
        description: newPostDescription,
        imageCount: croppedImages.length,
      }).unwrap()

      if (postId) {
        await uploadPostPhotos({ photos: formattedToFormData, postId: postId }).unwrap()
        showSuccessToast(t.createPost.postCreated)
        closeHandler()
      } else {
        showErrorToast(t.createPost.postNotCreated)
      }
    } catch (e) {
      console.log(e)
      showErrorToast(t.createPost.postNotCreated)
    }
  }

  return (
    <div className={s.header}>
      <button disabled={isCreatingPostLoading} onClick={onPrevPage} type={'button'}>
        <ArrowIosBackOutline />
      </button>
      <Dialog.Title className={s.title}>{t.createPost.publishTitle}</Dialog.Title>
      <Button onClick={publishHandler} variant={'ghost'}>
        Publish
      </Button>
      <Dialog.Description className={s.hiddenElement}>
        {t.createPost.publishDescription}
      </Dialog.Description>
    </div>
  )
}

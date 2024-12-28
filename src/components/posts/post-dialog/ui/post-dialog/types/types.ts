import { modalName } from '@/components/posts/post-dialog/ui/post-dialog/post-dialog'
import { Owner, Post } from '@/services/posts/posts-types'
import { EditProfileResponse } from '@/services/profile/profile-types'

export type ModalState = (typeof modalName)[keyof typeof modalName] | null
type BaseProps = {
  owner?: Owner
  post: Post | undefined
  postDescription: string | undefined
  profileData?: EditProfileResponse | undefined
}
type ModalEditPostProps = {
  setCurrentModal: (modal: ModalState) => void
  setMenulOpen: (open: boolean) => void
  setPostDescription: (postDescription: string | undefined) => void
} & BaseProps

type PostActionsMenuProps = {
  handleClickOverlayViewPost: () => void
  handleDeletePost: () => void
  handleOpenEditingPost: () => void
  isMenuOpen: boolean
  isOpen: boolean
  setMenulOpen: (open: boolean) => void
} & BaseProps

type PostDialogProps = {
  isOpen: boolean
  isPostSpecificPage: boolean
  setOpen?: (flag: boolean) => void
  userId: string
} & BaseProps

export type Images = {
  id: string
  originalImageUrl: string
  smallImageUrl: string
}

export type Post = {
  createdAt: string
  description: string
  images: Images[]
  postId: string
  userId: string
}

export type getUserPostsResponse = {
  lastCursor: string
  posts: Post[]
}

export type createPostArgs = {
  description: string
  imageCount: number
}

export type uploadPhotosARgs = {
  photos: any
  postId: string
}

export type editPostArgs = {
  description: string
  id: string
}

export type Images = {
  id: string
  originalImageUrl: string
  smallImageUrl: string
}

export type Owner = {
  firstName: string
  lastName: string
  smallAvatarUrl: string
}

export type Post = {
  createdAt: string
  description: string
  images: Images[]
  postId: string
  userId: string
}

export type PostWithOwner = { owner: Owner } & Post

export type getUsersTotalCountResponse = {
  totalCount: number
}

export type getPostsResponse = {
  posts: Post[]
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

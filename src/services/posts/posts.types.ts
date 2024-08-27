import { Tag } from '@/services/tags/tags.types'
import { Models } from 'appwrite'

export type Post = {
  authorId: string
  comments?: Comment[]
  isPublished: boolean
  post: string
  tags?: Tag[]
  title: string
} & Models.Document

export type DeletePostRequest = { postId: string }
export type DeletePostResponse = { postId: string }
export type GetPostRequest = { postId: string }
export type GetPostResponse = { post: Post }
export type UpdatePostResponse = { post: Post }
export type UpdatePostRequest = { post: string; postId: string; tags: Tag[]; title: string }
export type CreatePostResponse = { post: Post }
export type CreatePostRequest = { authorId: string; post: string; tags: Tag[]; title: string }
export type GetPostsListResponse = { document: Models.DocumentList<Post>; total: number }

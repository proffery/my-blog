import { Tag } from '@/services/tags/tags.types'
import { Models } from 'appwrite'

export type Post = {
  authorId: string
  authorName: string
  isPublished: boolean
  post: string
  title: string
} & Models.Document

export type DeletePostRequest = { postId: string }
export type DeletePostResponse = { postId: string }
export type GetPostResponse = Post
export type UpdatePostResponse = Post
export type UpdatePostRequest = { post: string; postId: string; tags: Tag[]; title: string }
export type CreatePostResponse = Post
export type CreatePostRequest = {
  authorId: string
  authorName: string
  post: string
  tags: Tag[]
  title: string
}
export type GetPostsResponse = Models.DocumentList<Post>

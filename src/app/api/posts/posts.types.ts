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
export type GetPostRequest = { params: { postId: string } }
export type UpdatePostResponse = Post
export type UpdatePostRequest = { post: string; postId: string; tags: Tag[]; title: string }
export type CreatePostResponse = Post
export type CreatePostRequest = {
  authorId: string
  authorName: string
  post: string
  title: string
}
export type SortDirection = 'asc' | 'desc'
export type GetPostsResponse = Models.DocumentList<Post>
export type GetPostsRequest = {
  authorId?: string
  search?: string
  sortDirection?: SortDirection
}
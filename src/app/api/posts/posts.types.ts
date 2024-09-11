import { Models } from 'appwrite'

export type Post = {
  authorId: string
  authorName: string
  cover: string
  isPublished: boolean
  post: string
  title: string
} & Models.Document

export type DeletePostRequest = { postId: string }
export type DeletePostResponse = { postId: string }

export type GetPostResponse = Post
export type GetPostRequest = { params: { postId: string } }

export type GetNotPublishedPostsResponse = Models.DocumentList<Post>
export type GetNotPublishedPostsRequest = { sort?: SortDirection; sortBy: SortBy }

export type SortBy = '$createdAt' | '$updatedAt' | 'authorName' | 'title'

export type UpdatePostResponse = Post
export type UpdatePostRequest = {
  authorName: string
  cover?: string
  isPublished: boolean
  post: string
  postId: string
  title: string
}
export type PublishPostResponse = Post
export type PublishPostRequest = {
  isPublished: boolean
  postId: string
}
export type CreatePostResponse = Post
export type CreatePostRequest = {
  authorId: string
  authorName: string
  cover?: string
  isPublished: boolean
  post: string
  title: string
}
export type SortDirection = 'asc' | 'desc'
export type GetPostsResponse = Models.DocumentList<Post>
export type GetPostsRequest = {
  authorId?: string
  page?: string
  search?: string
  sort?: SortDirection
}

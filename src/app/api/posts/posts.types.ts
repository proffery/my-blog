import { Models } from 'appwrite'

export type PostModel = {
  authorId: string
  authorName: string
  cover: string
  isPublished: boolean
  post: string
  title: string
  views: number
} & Models.Document

export type DeletePostRequest = { postId: string }
export type DeletePostResponse = { postId: string }

export type GetPostResponse = PostModel
export type GetPostRequest = { params: { postId: string } }

export type GetNotPublishedPostsResponse = Models.DocumentList<PostModel>
export type GetNotPublishedPostsRequest = { locale: string; sort: SortDirection; sortBy: SortBy }

export type SortBy = '$createdAt' | '$updatedAt' | 'authorName' | 'title'

export type UpdatePostResponse = PostModel
export type UpdatePostRequest = {
  authorName: string
  cover?: string
  isPublished: boolean
  locale: string
  post: string
  postId: string
  title: string
}
export type PublishPostResponse = PostModel
export type PublishPostRequest = {
  isPublished: boolean
  postId: string
}
export type CreatePostResponse = PostModel
export type CreatePostRequest = {
  authorId: string
  authorName: string
  cover?: string
  isPublished: boolean
  locale: string
  post: string
  title: string
}
export type SortDirection = 'asc' | 'desc'
export type GetPostsResponse = Models.DocumentList<PostModel>
export type GetPostsRequest = {
  authorId?: string
  locale: string
  page?: string
  search?: string
  sort?: SortDirection
}

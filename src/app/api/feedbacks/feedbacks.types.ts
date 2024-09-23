import { SortDirection } from '@/app/api/posts/posts.types'
import { Models } from 'appwrite'

export type FeedbackModel = {
  authorId: string
  email: string
  isPublished: boolean
  isRead: boolean
  locale: string
  message: string
  name: string
} & Models.Document

export type DeleteFeedbackRequest = { feedbackId: string }
export type DeleteFeedbackResponse = { feedbackId: string }

export type FeedbacksSortBy =
  | '$createdAt'
  | '$updatedAt'
  | 'email'
  | 'isPublished'
  | 'isRead'
  | 'message'
  | 'name'

export type ChangePublishFeedbackResponse = FeedbackModel
export type ChangePublishFeedbackRequest = {
  feedbackId: string
  isPublished: boolean
}

export type ChangeReadFeedbackResponse = FeedbackModel
export type ChangeReadFeedbackRequest = {
  feedbackId: string
  isRead: boolean
}
export type CreateFeedbackResponse = FeedbackModel
export type CreateFeedbackRequest = {
  authorId?: string
  email: string
  feedbackId: string
  isPublished: boolean
  isRead: boolean
  locale: string
  message: string
  name: string
}

export type GetFeedbacksResponse = Models.DocumentList<FeedbackModel>
export type GetFeedbacksRequest = {
  isPublished: boolean
  isRead: boolean
  locale?: string
  sort?: SortDirection
  sortBy: FeedbacksSortBy
}
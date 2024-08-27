import { Models } from 'appwrite'

export type Comment = {
  authorId: string
  comment: string
  quotedId?: string
} & Models.Document

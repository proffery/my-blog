import type { Meta, StoryObj } from '@storybook/react'

import { FeedbackModel } from '@/app/api/feedbacks/feedbacks.types'
import cover from '@/assets/images/test-cover.jpg'
import { FeedbackCard } from '@/components/layouts/feedback-card/feedback-card'

const mockData: FeedbackModel = {
  $collectionId: '1',
  $createdAt: '2024-08-28T15:08:52.307+00:00',
  $databaseId: '1',
  $id: '1',
  $permissions: ['1'],
  $updatedAt: '2024-08-28T15:08:52.307+00:00',
  authorId: '1',
  email: 'test@test.com',
  isPublished: true,
  locale: 'en',
  message:
    'Feedback message. Feedback message. Feedback message. Feedback message. Feedback message. ',
  name: 'Author Name',
}

const meta = {
  component: FeedbackCard,
  tags: ['autodocs'],
  title: 'Layouts/FeedbackCard',
} satisfies Meta<typeof FeedbackCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    feedbackData: mockData,
  },
}

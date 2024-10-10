import type { Meta, StoryObj } from '@storybook/react'

import { PostModel } from '@/app/api/posts/posts.types'
import cover from '@/assets/images/test-cover.jpg'
import { PostsCard } from '@/components/pages/posts-page/posts-card/posts-card'

const mockData: PostModel = {
  $collectionId: '1',
  $createdAt: '2024-08-28T15:08:52.307+00:00',
  $databaseId: '1',
  $id: '1',
  $permissions: ['1'],
  $updatedAt: '2024-08-28T15:08:52.307+00:00',
  authorId: '1',
  authorName: 'Author',
  cover: '',
  isPublished: true,
  locale: 'en',
  post: 'Description',
  title: 'Title',
  views: 1,
}

const meta = {
  component: PostsCard,
  tags: ['autodocs'],
  title: 'Layouts/PostsCard',
} satisfies Meta<typeof PostsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    postData: mockData,
  },
}

export const WithCover: Story = {
  args: {
    postData: { ...mockData, cover: cover.src },
  },
}

export const WithCoverNotPublished: Story = {
  args: {
    postData: { ...mockData, cover: cover.src, isPublished: false },
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import cover from '@/assets/images/test-cover.jpg'
import { PostsCard } from '@/components/layouts/posts-card/posts-card'

const meta = {
  component: PostsCard,
  tags: ['autodocs'],
  title: 'Layouts/PostsCard',
} satisfies Meta<typeof PostsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: '2024-08-28T15:08:52.307+00:00',
    description: 'Description',
    postId: '1',
    title: 'Title',
  },
}

export const WithCover: Story = {
  args: {
    date: '2024-08-28T15:08:52.307+00:00',
    description: 'Description',
    image: cover.src,
    postId: '1',
    title: 'Title',
  },
}

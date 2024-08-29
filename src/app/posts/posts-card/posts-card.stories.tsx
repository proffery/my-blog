import type { Meta, StoryObj } from '@storybook/react'

import { PostsCard } from '@/app/posts/posts-card/posts-card'
import cover from '@/assets/images/no-image.svg'

const meta = {
  component: PostsCard,
  tags: ['autodocs'],
  title: 'Layouts/PostsCard',
} satisfies Meta<typeof PostsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { date: '', description: 'Description', postId: '1', title: 'Title' },
}

export const WithCover: Story = {
  args: { date: '', description: 'Description', postId: '1', title: 'Title' },
}

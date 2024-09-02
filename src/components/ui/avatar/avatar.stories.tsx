import type { Meta, StoryObj } from '@storybook/react'

import defaultImage from '@/assets/images/test-cover.jpg'

import { Avatar } from './avatar'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultSmall: Story = {
  args: {
    size: 'small',
  },
}

export const ImageSmall: Story = {
  args: {
    size: 'small',
    url: defaultImage.src,
  },
}

export const DefaultLarge: Story = {
  args: {
    size: 'large',
  },
}

export const ImageLarge: Story = {
  args: {
    size: 'large',
    url: defaultImage.src,
  },
}

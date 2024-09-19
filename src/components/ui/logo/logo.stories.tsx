import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from '@/components/ui/logo/logo'

const meta = {
  component: Logo,
  tags: ['autodocs'],
  title: 'Layouts/Logo',
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

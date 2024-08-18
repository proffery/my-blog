import { LinearLoader } from '@/components/ui/linear-loader/linear-loader'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: LinearLoader,
  tags: ['autodocs'],
  title: 'Components/LinearLoader',
} satisfies Meta<typeof LinearLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

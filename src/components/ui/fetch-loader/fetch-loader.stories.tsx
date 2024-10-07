import { FetchLoader } from '@/components/ui/fetch-loader/fetch-loader'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: FetchLoader,
  tags: ['autodocs'],
  title: 'Components/FetchLoader',
} satisfies Meta<typeof FetchLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: true,
  },
}

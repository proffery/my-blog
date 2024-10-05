import { InitializationLoader } from '@/components/ui/initialization-loader/initialization-loader'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: InitializationLoader,
  tags: ['autodocs'],
  title: 'Components/InitializationLoader',
} satisfies Meta<typeof InitializationLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isTouched: true,
    setIsTouched: fn(),
  },
}

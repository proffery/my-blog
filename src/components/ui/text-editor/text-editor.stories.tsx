import { TextEditor } from '@/components/ui/text-editor/text-editor'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: TextEditor,
  tags: ['autodocs'],
  title: 'Components/TextEditor',
} satisfies Meta<typeof TextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Editor: Story = {
  args: {
    onChange: fn(),
  },
}

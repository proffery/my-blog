import type { Meta, StoryObj } from '@storybook/react'

import { EditableSpan } from '@/components/ui/editable-span/editable-span'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {
    onChange: {
      action: 'changed',
      description: 'Changeable value',
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: EditableSpan,
  tags: ['autodocs'],
  title: 'Components/EditableSpan',
} satisfies Meta<typeof EditableSpan>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'Text',
    onSubmit: fn(),
  },
}

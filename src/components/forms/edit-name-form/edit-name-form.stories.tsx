import type { Meta, StoryObj } from '@storybook/react'

import { EditNameForm } from '@/components/forms/edit-name-form/edit-name-form'
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
  component: EditNameForm,
  tags: ['autodocs'],
  title: 'Forms/EditNameForm',
} satisfies Meta<typeof EditNameForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'Text',
    onSubmit: fn(),
  },
}

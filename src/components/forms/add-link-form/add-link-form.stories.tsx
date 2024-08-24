import type { Meta, StoryObj } from '@storybook/react'

import { AddLinkForm } from '@/components/forms/add-link-form/add-link-form'
import { fn } from '@storybook/test'

const meta = {
  component: AddLinkForm,
  tags: ['autodocs'],
  title: 'Forms/AddLinkForm',
} satisfies Meta<typeof AddLinkForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { AddTiktokIdForm } from '@/components/forms/add-tiktok-id-form/add-tiktok-id-form'
import { fn } from '@storybook/test'

const meta = {
  component: AddTiktokIdForm,
  tags: ['autodocs'],
  title: 'Forms/AddTiktokIdForm',
} satisfies Meta<typeof AddTiktokIdForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { AddYoutubeLinkForm } from '@/components/forms/add-youtube-link-form/add-youtube-link-form'
import { fn } from '@storybook/test'

const meta = {
  component: AddYoutubeLinkForm,
  tags: ['autodocs'],
  title: 'Forms/AddYoutubeLinkForm',
} satisfies Meta<typeof AddYoutubeLinkForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
}

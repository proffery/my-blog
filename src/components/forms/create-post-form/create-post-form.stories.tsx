import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { LoginForm } from '@/components/forms/login-form/login-form'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: CreatePostForm,
  tags: ['autodocs'],
  title: 'Forms/CreatePostForm',
} satisfies Meta<typeof CreatePostForm>

export default meta
type Story = StoryObj<typeof meta>

export const CreatePost: Story = {
  args: {
    disabled: false,
    onSubmit: fn(),
  },
}
export const CreatePostDisabled: Story = {
  args: {
    disabled: true,
    onSubmit: fn(),
  },
}

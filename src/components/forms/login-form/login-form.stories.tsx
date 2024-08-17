import { LoginForm } from '@/components/forms/login-form/login-form'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: LoginForm,
  tags: ['autodocs'],
  title: 'Forms/Login',
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Login: Story = {
  args: {
    disabled: false,
    onSubmit: fn(),
  },
}
export const LoginDisabled: Story = {
  args: {
    disabled: true,
    onSubmit: fn(),
  },
}

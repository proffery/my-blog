import { RegistrationForm } from '@/components/forms/registration-form/registration-form'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: RegistrationForm,
  tags: ['autodocs'],
  title: 'Forms/Registration',
} satisfies Meta<typeof RegistrationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Registration: Story = {
  args: {
    disabled: false,
    onSubmit: fn(),
  },
}
export const RegistrationDisabled: Story = {
  args: {
    disabled: true,
    onSubmit: fn(),
  },
}

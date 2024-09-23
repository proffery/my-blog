import { ContactUsForm } from '@/components/forms/contact-us-form/contact-us-form'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: ContactUsForm,
  tags: ['autodocs'],
  title: 'Forms/ContactUsForm',
} satisfies Meta<typeof ContactUsForm>

export default meta
type Story = StoryObj<typeof meta>

export const Login: Story = {
  args: {
    disabled: false,
    onSubmit: fn(),
  },
}
export const ContactUsDisabled: Story = {
  args: {
    disabled: true,
    onSubmit: fn(),
  },
}

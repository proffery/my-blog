import cover from '@/assets/images/test-cover.jpg'
import { UploadAvatarForm } from '@/components/forms/upload-avatar-form/upload-avatar-form'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: UploadAvatarForm,
  tags: ['autodocs'],
  title: 'Forms/UploadAvatar',
} satisfies Meta<typeof UploadAvatarForm>

export default meta
type Story = StoryObj<typeof meta>

export const UploadPhoto: Story = {
  args: {
    currentAvatarUrl: cover.src,
    onSubmit: fn(),
  },
}

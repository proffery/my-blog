import { SwiperDecorationModel } from '@/components/layouts/contacts-page/swiper-decoration-model/swiper-decoration-model'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: SwiperDecorationModel,
  tags: ['autodocs'],
  title: 'Layouts/SwiperDecorationModel',
} satisfies Meta<typeof SwiperDecorationModel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    setShowAnimation: fn(),
    showAnimation: false,
  },
}

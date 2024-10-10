import { SwiperDecorationModel } from '@/components/pages/contacts-page/swiper-decoration-model/swiper-decoration-model'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SwiperDecorationModel,
  tags: ['autodocs'],
  title: 'Layouts/SwiperDecorationModel',
} satisfies Meta<typeof SwiperDecorationModel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showAnimation: false,
  },
}

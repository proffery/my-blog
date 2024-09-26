import type { Meta, StoryObj } from '@storybook/react'

import { SwiperComponent } from '@/components/ui/swiper/swiper'

const meta = {
  component: SwiperComponent,
  tags: ['autodocs'],
  title: 'Components/SwiperComponent',
} satisfies Meta<typeof SwiperComponent>

export default meta
type Story = StoryObj<typeof meta>
export const Default = () => (
  <SwiperComponent>
    <div style={{ border: '1px solid', height: '200px', width: '200px' }}>Test</div>
    <div style={{ border: '1px solid', height: '200px', width: '200px' }}>Test</div>
    <div style={{ border: '1px solid', height: '200px', width: '200px' }}>Test</div>
  </SwiperComponent>
)

export const Pagination = () => (
  <SwiperComponent showNavigation={false}>
    <div style={{ border: '1px solid', height: '100px', width: '100px' }}>Test</div>
    <div style={{ border: '1px solid', height: '100px', width: '100px' }}>Test</div>
    <div style={{ border: '1px solid', height: '100px', width: '100px' }}>Test</div>
  </SwiperComponent>
)

export const Navigation = () => (
  <SwiperComponent showPagination={false}>
    <div style={{ border: '1px solid', height: '100px', width: '100px' }}>Test</div>
    <div style={{ border: '1px solid', height: '100px', width: '100px' }}>Test</div>
    <div style={{ border: '1px solid', height: '100px', width: '100px' }}>Test</div>
  </SwiperComponent>
)

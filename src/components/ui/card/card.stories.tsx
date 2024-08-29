import type { Meta, StoryObj } from '@storybook/react'

import cover from '@/assets/images/no-image.svg'
import { Button } from '@/components/ui/button/button'
import { Card } from '@/components/ui/card/card'
import Image from 'next/image'

import { Typography } from '../typography/typography'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ width: '432px' }}>
        <Typography.H1 style={{ textAlign: 'center' }}>Learn &quot;Deck name&quot;</Typography.H1>
        <Typography.Body1 as={'div'}>
          <Typography.Subtitle1 as={'span'}>Question:</Typography.Subtitle1> How &quot;This&quot;
          works in JavaScript?
          <Typography.Body2 style={{ color: 'var(--color-dark-100)' }}>
            Number of attempts to answer a question: 10
          </Typography.Body2>
        </Typography.Body1>
        <Button>Show Answer</Button>
      </div>
    ),
  },
}

export const WithCover: Story = {
  args: {
    children: (
      <div style={{ width: '432px' }}>
        <Image alt={'Card cover'} src={cover} style={{ height: 'auto', width: '400px' }} />
        <Typography.H1 style={{ textAlign: 'center' }}>Learn &quot;Deck name&quot;</Typography.H1>
        <Typography.Body1 as={'div'}>
          <Typography.Subtitle1 as={'span'}>Question:</Typography.Subtitle1> How &quot;This&quot;
          works in JavaScript?
          <Typography.Body2 style={{ color: 'var(--color-dark-100)' }}>
            Number of attempts to answer a question: 10
          </Typography.Body2>
        </Typography.Body1>
        <Button>Show Answer</Button>
      </div>
    ),
  },
}

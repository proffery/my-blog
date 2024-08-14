import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button/button'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Button clicked',
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  args: {
    onClick: fn(),
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    as: 'button',
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    as: 'button',
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const PrimaryFullWidth: Story = {
  args: {
    as: 'button',
    children: 'Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const SecondaryFullWidth: Story = {
  args: {
    as: 'button',
    children: 'Secondary Button',
    disabled: false,
    fullWidth: true,
    variant: 'secondary',
  },
}

export const PrimaryDisabled: Story = {
  args: {
    as: 'button',
    children: 'Primary Disabled',
    disabled: true,
    variant: 'primary',
  },
}

export const SecondaryDisabled: Story = {
  args: {
    as: 'button',
    children: 'Secondary Disabled ',
    disabled: true,
    variant: 'secondary',
  },
}

export const AsLinkPrimary: Story = {
  args: {
    as: 'a',
    children: 'As link Primary',
    disabled: false,
    variant: 'primary',
  },
}

export const AsLinkSecondary: Story = {
  args: {
    as: 'a',
    children: 'As link Secondary',
    disabled: false,
    variant: 'secondary',
  },
}

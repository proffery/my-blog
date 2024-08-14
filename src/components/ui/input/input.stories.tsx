import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@/components/ui/input/input'

const meta = {
  argTypes: {
    onChange: {
      action: 'changed',
      description: 'Changeble value',
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    disabled: false,
    label: 'Input',
    placeholder: 'Input',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    disabled: false,
    label: 'Input',
    placeholder: 'Input',
    variant: 'secondary',
  },
  decorators: [
    Story => (
      <div
        style={{
          backgroundColor: 'var(--color-dark)',
          padding: '10px',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export const PrimaryAsTextarea: Story = {
  args: {
    as: 'textarea',
    disabled: false,
    label: 'Textarea',
    placeholder: 'Textarea',
    variant: 'primary',
  },
}

export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
    label: 'Input',
    placeholder: 'Input',
    variant: 'primary',
  },
}

export const PrimaryError: Story = {
  args: {
    disabled: false,
    errorMessage: 'Error!',
    label: 'Input',
    placeholder: 'Input',
    variant: 'primary',
  },
}

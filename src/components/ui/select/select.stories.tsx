import type { Meta, StoryObj } from '@storybook/react'

import { Select, SelectItem } from './select'

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
}

export default meta

type SelectStory = StoryObj<typeof Select>

// Mock options for the select component
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
  { label: 'Option 6', value: 'option6' },
  { label: 'Option 7', value: 'option7' },
  { label: 'Option 8', value: 'option8' },
  { label: 'Option 9', value: 'option9' },
  { label: 'Option 10', value: 'option10' },
  { label: 'Option 11', value: 'option11' },
  { label: 'Option 12', value: 'option12' },
  { label: 'Option 13', value: 'option13' },
  { label: 'Option 14', value: 'option14' },
  { label: 'Option 15', value: 'option15' },
  { label: 'Option 16', value: 'option16' },
  { label: 'Option 17', value: 'option17' },
  { label: 'Option 18', value: 'option18' },
  {
    label: 'LargeOption LargeOption LargeOption LargeOption LargeOption LargeOption LargeOption',
    value: 'option20',
  },
]

export const Default: SelectStory = {
  args: {
    label: 'Select box',
    placeholder: 'Select an option',
  },
  render: args => (
    <Select {...args}>
      {options.map(option => (
        <SelectItem key={option.value} value={option.value} {...args}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  ),
}

export const Disabled: SelectStory = {
  args: {
    disabled: true,
    label: 'Select box',
    placeholder: 'Select an option',
  },
  render: args => (
    <Select {...args}>
      {options.map(option => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  ),
}

import { useState } from 'react'

import { Button } from '@/components/ui/button/button'
import { Dialog, DialogProps } from '@/components/ui/dialog/dialog'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onOpenChange: fn(),
  },
  render: (args: DialogProps) => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Dialog
          {...args}
          onCancel={() => setOpen(false)}
          onOpenChange={setOpen}
          open={open}
          title={'Title'}
        >
          Dialog content here
        </Dialog>
      </>
    )
  },
}

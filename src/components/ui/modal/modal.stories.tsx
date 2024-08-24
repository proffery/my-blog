import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Modal, ModalTrigger } from '@/components/ui/modal/modal'
import { Typography } from '@/components/ui/typography/typography'

const meta = {
  args: {
    title: 'Title',
  },
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const InteractiveModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  return (
    <>
      <Modal
        onOpenChange={setIsOpen}
        open={isOpen}
        title={'Title'}
        trigger={
          <ModalTrigger>
            <Button>Open</Button>
          </ModalTrigger>
        }
      >
        <Typography.Body1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa
        </Typography.Body1>
        <Input label={'Input'} placeholder={'Input'} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button>Button primary</Button>
        </div>
      </Modal>
    </>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveModal />,
}

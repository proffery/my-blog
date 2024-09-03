import type { Meta, StoryObj } from '@storybook/react'

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell></TableHeadCell>
          <TableHeadCell>Column1</TableHeadCell>
          <TableHeadCell>Column2</TableHeadCell>
          <TableHeadCell>Column3</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableHeadCell>Row1</TableHeadCell>
          <TableBodyCell>mark</TableBodyCell>
          <TableBodyCell>Cell2</TableBodyCell>
          <TableBodyCell>Cell3</TableBodyCell>
        </TableRow>
        <TableRow>
          <TableHeadCell>Row2</TableHeadCell>
          <TableBodyCell>Cell4</TableBodyCell>
          <TableBodyCell>mark</TableBodyCell>
          <TableBodyCell>Cell6</TableBodyCell>
        </TableRow>
        <TableRow>
          <TableHeadCell>Row3</TableHeadCell>
          <TableBodyCell>Cell7</TableBodyCell>
          <TableBodyCell>Cell8</TableBodyCell>
          <TableBodyCell>mark</TableBodyCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

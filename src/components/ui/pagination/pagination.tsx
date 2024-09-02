import * as React from 'react'
import { ChangeEvent } from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type Props = {
  boundaryCount?: number
  count: number
  onChange: (e: ChangeEvent<unknown>, page: number) => void
  page: number
  siblingCount?: number
}

export default function PaginationComponent({
  boundaryCount = 2,
  count,
  onChange,
  page,
  siblingCount = 1,
}: Props) {
  return (
    <Stack spacing={2}>
      <Pagination
        boundaryCount={boundaryCount}
        count={count}
        onChange={onChange}
        page={page}
        shape={'rounded'}
        siblingCount={siblingCount}
        sx={{
          '.Mui-selected': {
            border: '1px solid var(--color-dark)',
            opacity: 0.7,
          },
          button: { color: 'var(--color-dark)' },
        }}
        variant={'outlined'}
      />
    </Stack>
  )
}

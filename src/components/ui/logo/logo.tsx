import { routes } from '@/common/constants/routes'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './logo.module.scss'

export const Logo = () => {
  const classNames = {
    root: clsx(s.root),
  }

  return (
    <Typography.H1 as={Link} className={classNames.root} href={routes.base}>
      Лого
    </Typography.H1>
  )
}

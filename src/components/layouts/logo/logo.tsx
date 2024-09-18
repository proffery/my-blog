import { routes } from '@/common/constants/routes'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './logo.module.scss'

type Props = {
  variant?: 'primary' | 'secondary'
}

export const Logo = ({ variant = 'primary' }: Props) => {
  const classNames = {
    firstLine: clsx(s.firstLine, s[variant]),
    root: clsx(s.root),
    secondLine: clsx(s.secondLine),
  }

  return (
    <Link className={classNames.root} href={routes.base}>
      <Typography.H3 as={'h1'} className={classNames.firstLine}>
        STREET PHOTO
      </Typography.H3>
      <Typography.H3 as={'span'} className={classNames.secondLine}>
        World
      </Typography.H3>
    </Link>
  )
}

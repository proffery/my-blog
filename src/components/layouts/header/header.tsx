import { routes } from '@/common/constants/routes'
import { Button } from '@/components/ui/button/button'
import clsx from 'clsx'
import Link from 'next/link'

import s from './header.module.scss'
export const Header = () => {
  const classNames = {
    container: clsx(s.container),
    root: clsx(s.root),
  }

  return (
    <header className={classNames.root}>
      <div className={classNames.container}>
        <nav></nav>
        <Button as={Link} href={routes.login}>
          Log in
        </Button>
      </div>
    </header>
  )
}

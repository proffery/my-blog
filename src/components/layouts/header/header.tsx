import { Button } from '@/components/ui/button/button'
import clsx from 'clsx'

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
        <Button>Log in</Button>
      </div>
    </header>
  )
}

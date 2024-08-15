import clsx from 'clsx'

import s from './footer.module.scss'
export const Footer = () => {
  const classNames = {
    root: clsx(s.root),
  }

  return <footer className={classNames.root}>Footer</footer>
}

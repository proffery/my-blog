import clsx from 'clsx'

import s from './linear-loader.module.scss'
export const LinearLoader = () => {
  const classNames = {
    root: clsx(s.loader),
  }

  return <div className={classNames.root} />
}

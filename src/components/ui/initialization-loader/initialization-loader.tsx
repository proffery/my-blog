import clsx from 'clsx'

import s from './initialization-loader.module.scss'
export const InitializationLoader = () => {
  const classNames = {
    background: clsx(s.background),
    loader: clsx(s.loader),
  }

  return (
    <>
      <div className={classNames.background} />
      <div className={classNames.loader} />
    </>
  )
}

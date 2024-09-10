import { AvatarDefault } from '@/assets/icons/components/avatar-default'
import clsx from 'clsx'

import s from './avatar.module.scss'

type Props = {
  className?: string
  size?: 'large' | 'small'
  url?: string
}

export const Avatar = ({ className, size = 'small', url }: Props) => {
  const classNames = {
    container: clsx(s.container, s[size], className),
    default: clsx(s.default, s[size + 'Default']),
    image: clsx(s.image, s[size], url && s.withImage),
  }

  return (
    <div className={classNames.container}>
      {url ? (
        <img
          alt={'avatar'}
          className={classNames.image}
          height={size === 'large' ? 200 : 30}
          src={url}
          width={size === 'large' ? 200 : 30}
        />
      ) : (
        <AvatarDefault className={classNames.default} />
      )}
    </div>
  )
}

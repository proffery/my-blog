import { routes } from '@/common/constants/routes'
import { HeaderMenu } from '@/components/layouts/header-menu/header-menu'
import { Logo } from '@/components/layouts/logo/logo'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './footer.module.scss'
export const Footer = () => {
  const classNames = {
    container: clsx(s.container),
    content: clsx(s.content),
    copyrights: clsx(s.copyrights),
    copyrightsLink: clsx(s.copyrightsLink),
    navbar: clsx(s.navbar),
    root: clsx(s.root),
  }

  const t = useTranslations('Components.Header.Navbar')
  const t2 = useTranslations('Components.Footer')

  return (
    <footer className={classNames.root}>
      <div className={classNames.container}>
        <div className={classNames.content}>
          <Logo variant={'secondary'} />
          <nav className={classNames.navbar}>
            <ActiveLink href={routes.base} variant={'secondary'}>
              {t('Home')}
            </ActiveLink>
            <ActiveLink href={routes.posts} variant={'secondary'}>
              {t('Posts')}
            </ActiveLink>
            <ActiveLink href={routes.contacts} variant={'secondary'}>
              {t('Contacts')}
            </ActiveLink>
          </nav>
        </div>
        <Typography.Body2 as={'div'} className={classNames.copyrights}>
          <div>{new Date().getFullYear() + ' ©'}&nbsp;</div>
          <Link className={classNames.copyrightsLink} href={routes.base}>
            STREET PHOTO WORLD
          </Link>
          <div>&nbsp;{t2('Copyrights')}</div>
        </Typography.Body2>
      </div>
    </footer>
  )
}

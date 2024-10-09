import { routes } from '@/common/constants/routes'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { Logo } from '@/components/ui/logo/logo'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './footer.module.scss'
export const Footer = () => {
  const classNames = {
    columns: clsx(s.columns),
    container: clsx(s.container),
    content: clsx(s.content),
    copyrights: clsx(s.copyrights),
    copyrightsLink: clsx(s.copyrightsLink),
    root: clsx(s.root),
    row: clsx(s.row),
  }

  const t = useTranslations('Components.Footer')

  return (
    <footer className={classNames.root}>
      <div className={classNames.container}>
        <div className={classNames.content}>
          <Logo variant={'secondary'} />
          <div className={classNames.row}>
            <nav className={classNames.columns}>
              <ActiveLink href={routes.base} variant={'secondary'}>
                {t('Navbar.Home')}
              </ActiveLink>
              <ActiveLink href={routes.posts} variant={'secondary'}>
                {t('Navbar.Posts')}
              </ActiveLink>
              <ActiveLink href={routes.contacts} variant={'secondary'}>
                {t('Navbar.Contacts')}
              </ActiveLink>
            </nav>
            <div className={classNames.columns}>
              <ActiveLink href={routes.base} variant={'secondary'}>
                About
              </ActiveLink>
              <ActiveLink href={routes.base} variant={'secondary'}>
                FAQs
              </ActiveLink>
              <ActiveLink href={routes.base} variant={'secondary'}>
                Terms
              </ActiveLink>
            </div>
          </div>
        </div>
        <Typography.Body2 as={'div'} className={classNames.copyrights}>
          <div>{new Date().getFullYear() + ' ©'}&nbsp;</div>
          <Link className={classNames.copyrightsLink} href={routes.base}>
            STREET PHOTO WORLD
          </Link>
          <div>&nbsp;{t('Copyrights')}</div>
        </Typography.Body2>
      </div>
    </footer>
  )
}

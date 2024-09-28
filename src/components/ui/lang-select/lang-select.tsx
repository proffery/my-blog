import { Button } from '@/components/ui/button/button'
import { locales } from '@/i18n/config'
import { setLocaleToCookies } from '@/server/functions/locales/set-locale-to-cookies'
import clsx from 'clsx'
import { useLocale } from 'next-intl'

import s from './lang.module.scss'

export function LangSelect() {
  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    form: clsx(s.form),
    page: clsx(s.page),
  }

  const currentLocale = useLocale()

  return (
    <div className={classNames.buttonsWrapper}>
      {locales.map(locale => (
        <form
          action={() => setLocaleToCookies({ locale })}
          className={classNames.form}
          key={locale}
        >
          <Button
            padding={false}
            type={'submit'}
            variant={locale === currentLocale ? 'secondary' : 'primary'}
          >
            {locale}
          </Button>
        </form>
      ))}
    </div>
  )
}

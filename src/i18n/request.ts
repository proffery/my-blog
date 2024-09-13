import { defaultLocale } from '@/i18n/config'
import { getLocaleFromCookies } from '@/server/functions/locales/get-locale-from-cookies'
import { getLocaleFromHeader } from '@/server/functions/locales/get-locale-from-header'
import { setLocaleToCookies } from '@/server/functions/locales/set-locale-to-cookies'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  const locale = getLocaleFromCookies()

  if (locale) {
    const messages = await import(`/locales/${locale}/common.json`)

    return {
      locale,
      messages: messages.default,
    }
  } else {
    const messages = await import(`/locales/${getLocaleFromHeader() ?? defaultLocale}/common.json`)

    return {
      locale: getLocaleFromHeader() ?? defaultLocale,
      messages: messages.default,
    }
  }
})

import { getLocaleFromCookies } from '@/server/functions/locales/get-locale-from-cookies'
import { getLocaleFromHeader } from '@/server/functions/locales/get-locale-from-header'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale } from './config'

export default getRequestConfig(async () => {
  const locale = getLocaleFromCookies()

  if (locale) {
    return {
      locale,
      messages: (await import(`/messages/${locale}.json`)).default,
    }
  } else {
    return {
      locale: getLocaleFromHeader() ?? defaultLocale,
      messages: (await import(`/messages/${getLocaleFromHeader() ?? defaultLocale}.json`)).default,
    }
  }
})

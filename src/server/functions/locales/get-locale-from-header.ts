import { locales } from '@/i18n/config'
import { headers } from 'next/headers'

export function getLocaleFromHeader() {
  return headers()
    .get('accept-language')
    ?.split(',')
    .map(i => i.split(';'))
    ?.reduce(
      (ac: { code: string; priority: string }[], lang) => [
        ...ac,
        { code: lang[0], priority: lang[1] },
      ],
      []
    )
    ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
    ?.find(i => locales.includes(i.code.substring(0, 2)))
    ?.code?.substring(0, 2)
}

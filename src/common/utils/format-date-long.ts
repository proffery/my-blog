import { Locale } from '@/i18n/config'
import { createFormatter } from 'next-intl'

export const formatDateLong = (
  date: string,
  locale: Locale,
  format: ReturnType<typeof createFormatter>
) => {
  const dateTime = new Date(date)

  return format.dateTime(dateTime, {
    day: 'numeric', // Day of the month
    hour: '2-digit', // Two-digit hour
    hour12: locale !== 'ru', // 24-hour format
    minute: '2-digit', // Two-digit minute
    month: 'short', // Full month [name]
    second: '2-digit', // Two-digit second
    year: 'numeric', // Full year
  })
}

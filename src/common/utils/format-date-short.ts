import { createFormatter } from 'next-intl'

export const formatDateShort = (date: string, format: ReturnType<typeof createFormatter>) => {
  const dateTime = new Date(date)

  return format.dateTime(dateTime, {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
    year: 'numeric',
  })
}

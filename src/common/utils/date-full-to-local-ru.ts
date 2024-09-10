export function dateFullToLocalRu(isoString: string): string {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric', // Day of the month
    hour: '2-digit', // Two-digit hour
    hour12: false, // 24-hour format
    minute: '2-digit', // Two-digit minute
    month: 'short', // Full month [name]
    second: '2-digit', // Two-digit second
    year: 'numeric', // Full year
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(date)
}

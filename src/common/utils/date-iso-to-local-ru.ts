export function dateIsoToLocalRu(isoString: string): string {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: '2-digit',
    weekday: 'short',
    year: '2-digit',
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(date)
}

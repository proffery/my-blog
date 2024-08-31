export function cleanFromHTML(html: null | string | undefined): string {
  const cleanText = html?.replace(/<[^>]*>/g, ' ').trim()

  if (cleanText) {
    return cleanText?.replace(/\s+/g, ' ')
  } else {
    return ''
  }
}

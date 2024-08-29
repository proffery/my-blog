export function cleanFromHTML(html: string): string {
  const cleanText = html.replace(/<[^>]*>/g, ' ').trim()

  return cleanText.replace(/\s+/g, ' ')
}

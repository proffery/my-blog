import { Inter, Nunito } from 'next/font/google'

export const inter = Inter({
  display: 'swap',
  subsets: ['cyrillic'],
  variable: '--font-inter',
  weight: ['400', '700'],
})

export const nunito = Nunito({
  display: 'swap',
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '700'],
})

import { Inter, Roboto } from 'next/font/google'

export const inter = Inter({
  display: 'swap',
  subsets: ['cyrillic'],
  variable: '--font-inter',
  weight: ['400', '700'],
})

export const roboto = Roboto({
  display: 'swap',
  subsets: ['cyrillic'],
  variable: '--font-roboto',
  weight: ['400', '700'],
})

import { Roboto_Serif, Vollkorn } from 'next/font/google'

export const vollkorn = Vollkorn({
  display: 'swap',
  subsets: ['cyrillic'],
  variable: '--font-vollkorn',
  weight: ['400', '700'],
})

export const roboto = Roboto_Serif({
  display: 'swap',
  subsets: ['cyrillic'],
  variable: '--font-roboto',
  weight: ['400', '700'],
})
